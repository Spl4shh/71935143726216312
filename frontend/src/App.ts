import { onMounted, provide } from "vue";
import { TeamMapper } from "./dto/mapper/team.mapper";
import { MatchMapper } from "./dto/mapper/match.mapper";
import { TournamentMapper } from "./dto/mapper/tournament.mapper";
import { UserMapper } from "./dto/mapper/user.mapper";
import { UserRequest } from "./request/user.request";
import { TournamentRequest } from "./request/tournament.request";
import { MatchRequest } from "./request/match.request";

export function appRun() {
  const userMapper = new UserMapper()
  const teamMapper = new TeamMapper()
  const matchMapper = new MatchMapper(teamMapper)
  const tournamentMapper = new TournamentMapper(teamMapper, matchMapper, userMapper)

  const userRequest = new UserRequest(userMapper);
  const tournamentRequest = new TournamentRequest(tournamentMapper, teamMapper);
  const matchRequest = new MatchRequest(matchMapper);

  provide("userMapper", userMapper)
  provide("teamMapper", teamMapper)
  provide("matchMapper", matchMapper)
  provide("tournamentMapper", tournamentMapper)

  provide("userRequest", userRequest)
  provide("tournamentRequest", tournamentRequest)
  provide("matchRequest", matchRequest)

  console.log("App is running");
}