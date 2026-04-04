import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): ResponseUserDto {
    const user = this.usersService.create(createUserDto);
    return new ResponseUserDto(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): ResponseUserDto[] {
    const allUsers = this.usersService.findAll();
    return allUsers.map((user) => new ResponseUserDto(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): ResponseUserDto {
    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new ResponseUserDto(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwordData: UpdatePasswordDto,
  ): ResponseUserDto {
    const user = this.usersService.update(id, passwordData);

    return new ResponseUserDto(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersService.remove(id);
  }
}
