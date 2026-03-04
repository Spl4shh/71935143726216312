import { Tournament } from "src/model/tournament.model";
import { TournamentDto } from "../tournament.dto";
import { TeamMapper } from "./team.mapper";
import { Inject } from "@nestjs/common";
import { MatchMapper } from "./match.mapper";
import { UserMapper } from "./user.mapper";

export class TournamentMapper {

      constructor(@Inject(TeamMapper) 
                  private teamMapper: TeamMapper,
                  @Inject(MatchMapper) 
                  private matchMapper: MatchMapper,
                  @Inject(UserMapper)
                  private userMapper: UserMapper) {}

      toTournamentDto(tournament: Tournament): TournamentDto {
            const tournamentDto = new TournamentDto();

            tournamentDto.id = tournament.id;
            tournamentDto.name = tournament.name;
            tournamentDto.date = tournament.date;
            tournamentDto.description = tournament.description;
            tournamentDto.creator = this.userMapper.toUserDto(tournament.creator)
            tournamentDto.teams = tournament.teams?.map(team => this.teamMapper.toTeamDto(team)) || [];
            tournamentDto.matches = tournament.matches?.map(match => this.matchMapper.toMatchDto(match)) || [];

            return tournamentDto;
      }

      toTournament(tournamentDto: TournamentDto): Tournament {
            const tournament = new Tournament();

            tournament.id = tournamentDto.id;
            tournament.name = tournamentDto.name;
            tournament.date = tournamentDto.date;
            tournament.description = tournamentDto.description;
            tournament.creator = this.userMapper.toUser(tournamentDto.creator)
            tournament.teams = tournamentDto.teams?.map(teamDto => this.teamMapper.toTeam(teamDto)) || [];
            tournament.matches = tournamentDto.matches?.map(matchDto => this.matchMapper.toMatch(matchDto)) || []; 
            
            return tournament;
      }
}