import { TeamDto } from "./team.dto";

export class MatchDto {
      public id?: number;

      public aTeam: TeamDto;

      public bTeam: TeamDto;

      public scoreA?: number;

      public scoreB?: number;
}