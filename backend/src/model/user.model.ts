import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
      @PrimaryGeneratedColumn()
      public id: number;

      @Column()
      public username: string;

      @Column()
      public password: string;

      @Column()
      public isAdmin: boolean;

      constructor(username: string, password: string, isAdmin: boolean) {
            this.username = username;
            this.password = password;
            this.isAdmin = isAdmin;
      }
}