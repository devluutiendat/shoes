import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
<<<<<<< HEAD
import { 
   ConfigService, } from '@nestjs/config';
import { UserService } from 'src/users/user.service';
=======
import { ConfigService, } from '@nestjs/config';
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService, JwtStrategy, PrismaService,UserService],
=======
  providers: [AuthService, JwtStrategy, PrismaService],
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  exports: [AuthService],
})
export class AuthModule {}
