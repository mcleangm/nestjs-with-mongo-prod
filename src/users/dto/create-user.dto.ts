import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

// swagger api
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The user email',
    required: true,
    type: String
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user password',
    required: true,
    type: String
  })
  readonly password: string;
}
