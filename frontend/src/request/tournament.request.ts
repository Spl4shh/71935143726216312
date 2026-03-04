import { TeamMapper } from "@/dto/mapper/team.mapper";
import { TournamentMapper } from "@/dto/mapper/tournament.mapper";
import { TournamentDto } from "@/dto/tournament.dto";
import { Team } from "@/model/team.model";
import { Tournament } from "@/model/tournament.model";

export class TournamentRequest {
      constructor(private tournamentMapper: TournamentMapper,
                  private teamMapper: TeamMapper) { }

      public async getTournament(tournamentId: number) {
            const response = await fetch(`http://localhost:8081/api/tournaments/${tournamentId}`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
            });

            if (!response.ok) {
                  throw new Error(`Failed to fetch tournament with id ${tournamentId}`);
            }

            const tournamentDto = await response.json() as TournamentDto;

            return this.tournamentMapper.toTournament(tournamentDto);
      }

      public async getTournaments() {
            const response = await fetch(`http://localhost:8081/api/tournaments`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
            });

            if (!response.ok) {
                  throw new Error(`Failed to fetch tournaments`);
            }

            const tournamentsFetched = await response.json() as TournamentDto[]

            return tournamentsFetched.map(tournament => this.tournamentMapper.toTournament(tournament));
      }      

      public async createTournament(tournament: Tournament) {
            const response = await fetch("http://localhost:8081/api/tournaments", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
                  body: JSON.stringify(this.tournamentMapper.toTournamentDto(tournament))
            })


            if (!response.ok) {
                  throw new Error("Erreur API")
            } else {
                  const tournamentDto = await response.json() as TournamentDto;
                  return this.tournamentMapper.toTournament(tournamentDto);
            }
      }

      public async getRanking(tournament: Tournament) {
            const response = await fetch(`http://localhost:8081/api/tournaments/${tournament.id}/ranking`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${sessionStorage.getItem("basicAuth")}`
                  },
            });

            if (!response.ok) {
                  throw new Error("Failed to fetch ranking");
            }

            return await response.json() as { team: Team; points: number }[];
      }

      public async generateMatches(tournament: Tournament) {
            return (await fetch(`http://localhost:8081/api/tournaments/${tournament.id}/generate-matches`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
            })).ok;
      }

      public async addTeam(tournament: Tournament, team: Team) {
            return (await fetch(`http://localhost:8081/api/tournaments/${tournament.id}/add-team`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
                  body: JSON.stringify(this.teamMapper.toTeamDto(team))
            })).ok;
      }
}