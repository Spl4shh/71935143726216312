import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match.model";
import { Team } from "./team.model";
import { User } from "./user.model";

@Entity()
export class Tournament {
      @PrimaryGeneratedColumn()
      public id?: number;

      @Column()
      public name: string;

      @Column()
      public date: Date;

      @Column({ nullable: true })
      public description?: string;

      @OneToOne(() => User, { eager: true, cascade: true })
      @JoinColumn()
      public creator: User;

      @ManyToMany(() => Team, { eager: true,  cascade: true })
      @JoinTable()
      public teams: Team[];

      @OneToMany(() => Match, (match) => match.tournament, { eager: true, cascade: true })
      public matches: Match[];
      

      public addTeam(team: Team): void {
            if (!this.teams.includes(team)) {
                  this.teams.push(team);
            }
      }
}