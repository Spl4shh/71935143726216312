import { MatchMapper } from "@/dto/mapper/match.mapper";
import { TeamMapper } from "@/dto/mapper/team.mapper";
import { TournamentMapper } from "@/dto/mapper/tournament.mapper";
import { TournamentDto } from "@/dto/tournament.dto";
import { Team } from "@/model/team.model";
import { Tournament } from "@/model/tournament.model";
import { router } from "@/router/router"
import { inject, onMounted, ref } from "vue";

export function showTournamentScript() {
      const tournamentId = Number(router.currentRoute.value.params.id)
      const tournament = ref<Tournament>();
      const newTeam = ref<Team>({ name: "" });
      const teamsRanking = ref<{ team: Team, points: number }[]>([]);
      const tournamentMapper = inject("tournamentMapper") as TournamentMapper;
      const matchMapper = inject("matchMapper") as MatchMapper;
      const teamMapper = inject("teamMapper") as TeamMapper;

      function goToTournaments() {
            router.push("/tournaments")
      }

      async function fetchTournament() {
            const response = await fetch(`http://localhost:8081/api/tournaments/${tournamentId}`, {
                  method: "GET",
                  headers: { 
                        "Content-Type": "application/json",
                        "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                  },
            });

            if (!response.ok) {
                  throw new Error(`Failed to fetch tournament with id ${tournamentId}`);
            }

            const tournamentDto = await response.json() as TournamentDto;

            tournament.value = tournamentMapper.toTournament(tournamentDto);
      }

      async function generateMatches() {
            const response = await fetch(`http://localhost:8081/api/tournaments/${tournamentId}/generate-matches`, {
                  method: "POST",
                  headers: { 
                        "Content-Type": "application/json",
                        "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                  },
            });

            if (response.ok) {
                  await fetchTournament();
                  fetchTeamsRanking();
            }
      }

      function fetchTeamsRanking() {
            fetch(`http://localhost:8081/api/tournaments/${tournamentId}/ranking`, {
                  method: "GET",
                  headers: { 
                        "Content-Type": "application/json",
                        "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                  },
            }).then(async response => await response.json() as { team: Team, points: number }[])
                  .then(teamsRankingData => {
                        teamsRanking.value = teamsRankingData;
                  })
      }

      async function updateMatches() {
            for (const match of tournament.value.matches) {
                  if (match.scoreA !== null && match.scoreB !== null) {
                        const response = await fetch(`http://localhost:8081/api/matches/${match.id}`, {
                              method: "PATCH",
                              headers: { 
                                    "Content-Type": "application/json",
                                    "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                              },
                              body: JSON.stringify(matchMapper.toMatchDto(match))
                        });

                        if (!response.ok) {
                              console.error("Failed to update match", match.id);
                        }
                  }
            }

            fetchTeamsRanking();
      }

      async function addTeam() {
            const response = await fetch(
                  `http://localhost:8081/api/tournaments/${tournamentId}/add-team`,
                  {
                        method: "POST",
                        headers: { 
                              "Content-Type": "application/json",
                              "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                        },
                        body: JSON.stringify(teamMapper.toTeamDto(newTeam.value))
                  }
            );

            if (response.ok) {
                  newTeam.value.name = "";
                  await fetchTournament();
                  fetchTeamsRanking();
            }
      }

      onMounted(() => {
            fetchTournament();
            fetchTeamsRanking();
      })

      return {
            newTeam,
            teamsRanking,
            tournament,
            addTeam,
            goToTournaments,
            generateMatches,
            updateMatches,
      }
}
