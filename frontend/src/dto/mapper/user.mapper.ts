import { User } from "@/model/user.model";
import { UserDto } from "../user.dto";

export class UserMapper {
      toUserDto(user: User): UserDto {
            const userDto = new UserDto();

            userDto.username = user.username;
            userDto.password = user.password;
            userDto.isAdmin = user.isAdmin;

            return userDto;
      }
      
      toUser(userDto: UserDto): User {
            return {
                  username: userDto.username,
                  password: userDto.password,
                  isAdmin: userDto.isAdmin
            }
      }
}