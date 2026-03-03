import { User } from "src/model/user.model";
import { UserDto } from "../user.dto";


export class UserMapper {
      toUserDto(user: User): UserDto {
            const userDto = new UserDto();

            userDto.id = user.id;
            userDto.username = user.username;
            userDto.password = user.password;
            userDto.isAdmin = user.isAdmin;

            return userDto;
      }
      
      toUser(userDto: UserDto): User {
            return new User(userDto.username, userDto.password, userDto.isAdmin);
      }
}