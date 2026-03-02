import { Body, Controller, Get, Inject, Injectable, Param, Post } from '@nestjs/common';
import { TournamentDto } from './dto/tournament.dto';
import { TournamentService } from 'src/service/tournament.service';
import { TournamentMapper } from './dto/mapper/tournament.mapper';
import { TeamDto } from './dto/team.dto';
import { TeamMapper } from './dto/mapper/team.mapper';

@Controller('tournaments')
export class TournamentController {
      constructor(
            @Inject(TournamentService) 
            private tournamentService: TournamentService,
            @Inject(TournamentMapper)
            private tournamentMapper: TournamentMapper,
            @Inject(TeamMapper)
            private teamMapper: TeamMapper
      ) {}

      @Get()
      async getAllTournaments() {
            return (await this.tournamentService.getAllTournaments()).map(tournament => this.tournamentMapper.toTournamentDto(tournament));
      }

      @Get(':id')
      async getTournament(@Param('id') id: number) {
            return this.tournamentMapper.toTournamentDto(await this.tournamentService.getTournament(id));
      }

      @Get(':id/ranking')
      async getRanking(@Param('id') id: number) {
            const tournament = await this.tournamentService.getTournament(id);
            return this.tournamentService.getRanking(tournament).map(teamAndPoints => {
                  return {
                        team: this.teamMapper.toTeamDto(teamAndPoints.team),
                        points: teamAndPoints.points
                  };
            });
      }

      @Post()
      createTournament(@Body() tournamentDto: TournamentDto) {
            this.tournamentService.saveTournament(this.tournamentMapper.toTournament(tournamentDto));
      }

      @Post(':id/generate-matches')
      async generateMatches(@Param('id') id: number) {
            const tournament = await this.tournamentService.getTournament(id);
            await this.tournamentService.generateMatches(tournament);
      }

      @Post(':id/add-team')
      async addTeamToTournament(@Param('id') id: number, @Body() team: TeamDto) {
            await this.tournamentService.addTeamToTournament(await this.tournamentService.getTournament(id),
                                                       this.teamMapper.toTeam(team));

            return this.tournamentMapper.toTournamentDto(await this.tournamentService.getTournament(id));
      }
}     
