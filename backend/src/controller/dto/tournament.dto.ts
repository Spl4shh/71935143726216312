import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { TeamDto } from "./team.dto";
import { MatchDto } from "./match.dto";
import { UserDto } from "./user.dto";

export class TournamentDto {
      
      public id?: number;
      
      public name: string;

      @Type(() => Date)
      @IsDate()
      public date: Date;
      
      public description?: string;

      public creator: UserDto

      public teams: TeamDto[];

      public matches: MatchDto[];
}