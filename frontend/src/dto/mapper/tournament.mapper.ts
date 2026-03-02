import { Tournament } from "@/model/tournament.model";
import { TournamentDto } from "../tournament.dto";
import { TeamMapper } from "./team.mapper";
import { MatchMapper } from "./match.mapper";

export class TournamentMapper {
      constructor(teamMapper: TeamMapper,
                  matchMapper: MatchMapper) {
            this.teamMapper = teamMapper;
            this.matchMapper = matchMapper;
      }

      private teamMapper: TeamMapper;
      private matchMapper: MatchMapper;

      toTournamentDto(tournament: Tournament): TournamentDto {
            const tournamentDto = new TournamentDto();
            console.log(tournamentDto);

            
            tournamentDto.id = tournament.id;
            tournamentDto.name = tournament.name;   
            tournamentDto.date = new Date(tournament.date).toISOString();
            tournamentDto.description = tournament.description;
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
                  teams: tournamentDto.teams?.map(teamDto => this.teamMapper.toTeam(teamDto)),
                  matches: tournamentDto.matches?.map(matchDto => this.matchMapper.toMatch(matchDto))
            };
      }
}