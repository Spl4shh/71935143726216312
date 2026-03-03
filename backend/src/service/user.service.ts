import { InjectRepository } from "@nestjs/typeorm";
import e from "express";
import { User } from "src/model/user.model";
import { Repository } from "typeorm";

export class UserService {
      constructor(@InjectRepository(User)
                  private userRepo: Repository<User>) {}

      public async saveUser(user: User): Promise<User> {
            if (!user.username || !user.password || user.isAdmin === undefined) {
                  throw new Error("Invalid user data");
            } else {
                  this.userRepo.findOneBy({ username: user.username }).then(existingUser => {
                        if (existingUser) {
                              throw new Error("Username already exists");
                        }
                  });

                  return await this.userRepo.save(user);     
            }

      }

      public async find(user: User): Promise<User> {
            if (!user.username || !user.password) {
                  throw new Error("Invalid user data");
            } else {
                  return await this.userRepo.findOneBy({ username: user.username }).then(async existingUser => {
                        if (!existingUser) {
                              throw new Error("Username does not exist");
                        } else {
                              return existingUser;
                        }
                  });
            }
      }
}