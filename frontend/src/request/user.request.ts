import { UserMapper } from "@/dto/mapper/user.mapper";
import { UserDto } from "@/dto/user.dto";
import { User } from "@/model/user.model";

export class UserRequest {
      constructor(private userMapper: UserMapper) {}
      
      public async login(user: User) {
            const response = await fetch("http://localhost:8081/api/users/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(this.userMapper.toUserDto(user))
            });

            if (!response.ok) {
                  throw new Error("Bad credentials");
            }

            return this.userMapper.toUser(await response.json() as UserDto);
      }
}