import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '@prisma/client';
<<<<<<< HEAD
import { UserService } from 'src/users/user.service';
=======
import { PrismaService } from 'prisma/prisma.service';
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
<<<<<<< HEAD
    private userService: UserService,
=======
    private prismaservice: PrismaService,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.accessToken      
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
<<<<<<< HEAD
    const user = await this.userService.getUserById(Number(payload.id));
=======
    const user = await this.prismaservice.user.findUnique({where: {id: payload.id}});
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    if (!user) {
      throw new UnauthorizedException(
        'User does not exist or token is invalid',
      );     
    }
    return user;
  }
}
