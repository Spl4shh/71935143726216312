import { Body, Controller, Inject, Post, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "src/service/user.service";
import { UserMapper } from "./dto/mapper/user.mapper";
import { Public } from "src/config/decorator/public.decorator";

@Controller('users')
export class UserController {
      constructor(@Inject(UserService)
                  private userService: UserService,
                  @Inject(UserMapper)
                  private userMapper: UserMapper) {}

      // endpoint utile uniquement dans ce test technique, en l'abscence d'un fournisseur d'identité 
      @Public()
      @Post()
      async createUser(@Body() userDto: UserDto) {
            return this.userMapper.toUserDto(await this.userService.saveUser(this.userMapper.toUser(userDto)));
      }

      @Public()
      @Post("login")
      async login(@Body() userDto: UserDto) {
            let user = await this.userService.find(this.userMapper.toUser(userDto))

            if (!user) {
                  throw new UnauthorizedException('Bad credentials');
            }   

            return this.userMapper.toUserDto(user);
      }
}
