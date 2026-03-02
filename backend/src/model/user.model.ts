import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
      @PrimaryGeneratedColumn()
      public id: number;

      @Column()
      public username: string;

      @Column()
      public password: string;

      constructor(id: number, username: string, password: string) {
            this.id = id;
            this.username = username;
            this.password = password;
      }
}