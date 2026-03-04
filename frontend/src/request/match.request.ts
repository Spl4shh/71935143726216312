import { MatchMapper } from "@/dto/mapper/match.mapper";
import { Match } from "@/model/match.model";

export class MatchRequest {
      constructor(private matchMapper: MatchMapper) {}

      public async updateMatch(match: Match) {
            const response = await fetch(`http://localhost:8081/api/matches/${match.id}`, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + sessionStorage.getItem("basicAuth")
                  },
                  body: JSON.stringify(this.matchMapper.toMatchDto(match))
            });

            if (!response.ok) {
                  console.error("Failed to update match", match.id);
            }
      }
}