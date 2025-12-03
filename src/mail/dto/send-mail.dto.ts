import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SendMailDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The recipient email' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'Welcome', description: 'The subject of the email' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Hello John, welcome to our service!', description: 'The body of the email' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
