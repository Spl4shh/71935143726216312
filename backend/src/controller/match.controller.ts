import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { MatchService } from "src/service/match.service";
import { MatchMapper } from "./dto/mapper/match.mapper";
import { MatchDto } from "./dto/match.dto";

@Controller('matches')
export class MatchController {
      constructor(@Inject(MatchService) 
                  private matchService: MatchService,
                  @Inject(MatchMapper)
                  private matchMapper: MatchMapper) {}
      
      @Get(':id')
      async getMatch(@Param('id') id: number) {
            return this.matchMapper.toMatchDto(await this.matchService.getMatch(id));
      }

      @Patch(':id')
      async updateScore(@Param('id') id: number, @Body() matchDto: MatchDto) {
            await this.matchService.updateScore(await this.matchService.getMatch(id),
                                          this.matchMapper.toMatch(matchDto));
      }
}