import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Match } from "src/model/match.model";
import { Repository } from "typeorm";

export class MatchService {
      constructor(
            @InjectRepository(Match)
            private matchRepo: Repository<Match>,
      ) {}

      public async saveMatch(match: Match): Promise<void> {
        	try {
			await this.matchRepo.save(match);
		} catch (error) {
			throw new Error(`Error saving match: ${error.message}`);
		}
      }

      public updateMatchResult(match: Match, team1Score: number, team2Score: number): void {
            if (team1Score < 0 || team2Score < 0) {
                throw new Error("Scores must be positive numbers");
            }
            
            match.scoreA = team1Score;
            match.scoreB = team2Score;

            this.saveMatch(match);
      }

      async getMatch(id: number): Promise<Match> {
            try {
                  return await this.matchRepo.findOneOrFail({
                        where: { id: id }
                  });
            } catch (error) {
                  throw new NotFoundException(`Match with id ${id} not found`);
            }
      }

      async updateScore(match: Match, matchUpdatedScore: Match) {
            if ((matchUpdatedScore.scoreA ?? 0) < 0 || (matchUpdatedScore.scoreB ?? 0) < 0) {
                throw new Error("Scores must be positive numbers");
            }
            
            match.scoreA = matchUpdatedScore.scoreA;
            match.scoreB = matchUpdatedScore.scoreB;

            await this.saveMatch(match)
      }
}