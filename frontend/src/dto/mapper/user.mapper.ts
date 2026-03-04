import { User } from "@/model/user.model";
import { UserDto } from "../user.dto";

export class UserMapper {
      toUserDto(user: User): UserDto {
            const userDto = new UserDto();

            console.log(7);
            userDto.id = user.id
            console.log(77);
            userDto.username = user.username;
            console.log(777);
            userDto.password = user.password;
            console.log(7777);
            userDto.isAdmin = user.isAdmin;

            console.log(77777);
           return userDto;
      }
      
      toUser(userDto: UserDto): User {
            return {
                  id: userDto.id,
                  username: userDto.username,
                  password: userDto.password,
                  isAdmin: userDto.isAdmin
            }
      }
}