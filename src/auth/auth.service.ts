import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from './dto/register';
import { Request, Response } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async generateTokens(user: { id: number; email: string }) {
    const payload = { id: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return { accessToken, refreshToken };
  }

  async register(data: RegisterDto, res: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone,
      },
    });

    const tokens = await this.generateTokens(user);

    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    return res.status(201).json({ message: 'User registered successfully' });
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    
    const adminEmail = process.env.EMAIL_ADMIN;
    const isAdmin = email === adminEmail; 
    const tokens = await this.generateTokens(user);

    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    return res.status(200).json({ message: 'Logged in successfully', admin : isAdmin });
  }

  async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new BadRequestException('Refresh token not found');

    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
      if (!user || !user.refreshToken) throw new UnauthorizedException('Access Denied');

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) throw new ForbiddenException('Invalid Refresh Token');

      const tokens = await this.generateTokens(user);

      this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
      return res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
      throw new ForbiddenException('Invalid Refresh Token');
    }
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new BadRequestException('Refresh token not found');

    try {
      const payload = this.jwtService.verify(refreshToken);

      await this.prisma.user.update({
        where: { id: payload.id },
        data: { refreshToken: null },
      });

      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      throw new ForbiddenException('Invalid Refresh Token');
    }
  }
  
  private setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 60 * 1000, // 1 phút
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
  }
}
