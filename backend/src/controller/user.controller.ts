import { Body, Controller, Inject, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "src/service/user.service";
import { UserMapper } from "./dto/mapper/user.mapper";

@Controller('users')
export class UserController {
      constructor(@Inject(UserService)
                  private userService: UserService,
                  @Inject(UserMapper)
                  private userMapper: UserMapper) {}

      // endpoint utile uniquement dans ce test technique, en l'abscence d'un fournisseur d'identité 
      @Post()
      async createUser(@Body() userDto: UserDto) {
            return this.userMapper.toUserDto(await this.userService.saveUser(this.userMapper.toUser(userDto)));
      }

      @Post("login")
      async login(@Body() userDto: UserDto) {
            try { 
                  return this.userMapper.toUserDto(await this.userService.find(this.userMapper.toUser(userDto)));
            } catch (error) {
                  return { error: error.message };
            }
      }
}
