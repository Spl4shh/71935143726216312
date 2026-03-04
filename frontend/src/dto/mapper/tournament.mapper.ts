import { Tournament } from "@/model/tournament.model";
import { TournamentDto } from "../tournament.dto";
import { TeamMapper } from "./team.mapper";
import { MatchMapper } from "./match.mapper";
import { UserMapper } from "./user.mapper";

export class TournamentMapper {
      constructor(teamMapper: TeamMapper,
                  matchMapper: MatchMapper,
                  userMapper: UserMapper) {
            this.teamMapper = teamMapper;
            this.matchMapper = matchMapper;
            this.userMapper = userMapper;
      }

      private teamMapper: TeamMapper;
      private matchMapper: MatchMapper;
      private userMapper: UserMapper;

      toTournamentDto(tournament: Tournament): TournamentDto {
            const tournamentDto = new TournamentDto();
            
            tournamentDto.id = tournament.id;
            tournamentDto.name = tournament.name;   
            console.log(0);
            tournamentDto.date = new Date(tournament.date).toISOString();
            console.log(10);
            tournamentDto.description = tournament.description;
            console.log(1);
            tournamentDto.creator = this.userMapper.toUserDto(tournament.creator)
            console.log(2);
            tournamentDto.teams = tournament.teams?.map(team => this.teamMapper.toTeamDto(team));
            tournamentDto.matches = tournament.matches?.map(match => this.matchMapper.toMatchDto(match));
            
            return tournamentDto;
      }

      toTournament(tournamentDto: TournamentDto): Tournament {
            return {
                  id: tournamentDto.id,
                  name: tournamentDto.name,
                  date: new Date(tournamentDto.date),
                  description: tournamentDto.description,
                  creator: this.userMapper.toUser(tournamentDto.creator),
                  teams: tournamentDto.teams?.map(teamDto => this.teamMapper.toTeam(teamDto)),
                  matches: tournamentDto.matches?.map(matchDto => this.matchMapper.toMatch(matchDto))
            };
      }
}