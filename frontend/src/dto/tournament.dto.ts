import { TeamDto } from "./team.dto";
import { MatchDto } from "./match.dto";
import { UserDto } from "./user.dto";

export class TournamentDto {
      
      public id?: number;
      
      public name: string;

      public date: string;
      
      public description?: string;

      public creator: UserDto

      public teams: TeamDto[];

      public matches: MatchDto[];
}