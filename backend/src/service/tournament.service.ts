import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Match } from "src/model/match.model";
import { Team } from "src/model/team.model";
import { Tournament } from "src/model/tournament.model";
import { Repository } from "typeorm";
import { TeamService } from "./team.service";
import { User } from "src/model/user.model";

@Injectable()
export class TournamentService {

	constructor(
		@InjectRepository(Tournament)
		private tournamentRepo: Repository<Tournament>,
		@Inject(TeamService)
		private teamService: TeamService
	) {}

	/**
	 * 
	 * @param tournament 
	 * @returns 
	 */
	public async saveTournament(tournament: Tournament) {
		try {
			await this.tournamentRepo.save(tournament);
		} catch (error) {
			throw new Error(`Error saving tournament: ${error.message}`);
		}
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	public async getTournament(id: number): Promise<Tournament> {
		try {
			return await this.tournamentRepo.findOneOrFail({
				where: { id: id }
			});
		} catch (error) {
			throw new NotFoundException(`Tournament with id ${id} not found`);
		}
	}

	/**
	 * @return An array of all tournaments.
	 */
	public async getAllTournaments(): Promise<Tournament[]> {
		try {
			return await this.tournamentRepo.find();
		} catch (error) {
			throw new NotFoundException(`Error retrieving tournaments: ${error.message}`);
		}
	}

	/**
	 * returns the ranking of teams in a tournament, sorted by points (descending).
	 * A team gets 3 points for a win, 1 point for a draw, and 0 points for a loss.
	 * 
	 * @param tournament The tournament for which to calculate the ranking.
	 * @returns An array of Team sorted by points in descending order.
	 */
	public getRanking(tournament: Tournament): { team: Team; points: number }[] {
		const points = new Map<number, { team: Team; points: number }>();

		for (const team of tournament.teams) {
			points.set(team.id!, {
				team: team,
				points: 0
			});
		}

		for (const match of tournament.matches) {
			const pointA = points.get(match.aTeam.id!)!;
			const pointB = points.get(match.bTeam.id!)!;

			if ((match.scoreA !== undefined && match.scoreA !== null) && match.scoreB !== undefined && match.scoreB !== null) {
				if (match.scoreA > match.scoreB) {
					pointA.points += 3;
				} else if (match.scoreA < match.scoreB) {
					pointB.points += 3;
				} else {
					pointA.points += 1;
					pointB.points += 1;
				}
			}
		}

		return Array.from(points.values())
				.sort((x, y) => y.points - x.points);
	}

	/**
	 * Generates matches for a tournament based on the teams registered in the tournament.
	 * 
	 * @param tournament The tournament for which to generate matches.
	 * @return The tournament with the generated matches.
	 * @throws Error if the tournament has less than 2 teams.
	 */
	public async generateMatches(tournament: Tournament): Promise<Tournament> {
		const teams = tournament.teams;
		tournament.matches = [];

		if (teams.length < 2) {
			console.error("Cannot generate matches for tournament with less than 2 teams");
			//throw new Error("At least 2 teams are required to generate matches");
		}

		for (let i = 0; i < teams.length; i++) {
			for (let j = i + 1; j < teams.length; j++) {
				const match = new Match(teams[i], teams[j]);

				tournament.matches.push(match);
			}
		}

		await this.saveTournament(tournament);

		return await this.getTournament(tournament.id!);
	}

	/**
	 * Définir la liste des équipe d'un tournoi.
	 * Supprime les anciennes équipes
	 * 
	 * @param tournament Le tournoi qui va accueillir la liste d'équipe
	 * @param teams Les {@link Team} à ajouter au tournoi
	 * @throws Error si une équipe n'existe pas ou si une équipe a déjà été ajoutée au tournoi
	 */
	public async setTeamsOfTournament(tournament: Tournament, teams: Team[]) {
		tournament.teams = [];

		for (const team of teams) {
			if (!team.id) {
				// TODO en fonction de la gestion coté front, remplacer cette ligne par un save
				let teamToAdd : Team|null = await this.teamService.getTeamByName(team.name);

				if (!teamToAdd) {
					teamToAdd = team;
				}

				tournament.addTeam(teamToAdd);
			} else {
				tournament.addTeam(team);
			}
		}

		await this.saveTournament(tournament);
	}

		/**
	 * Définir la liste des équipe d'un tournoi.
	 * Supprime les anciennes équipes
	 * 
	 * @param tournament Le tournoi qui va accueillir la liste d'équipe
	 * @param team La {@link Team} à ajouter au tournoi
	 * @throws Error si une équipe n'existe pas ou si une équipe a déjà été ajoutée au tournoi
	 */
	public async addTeamToTournament(tournament: Tournament, team: Team) {
		if (!team.id) {
			// TODO en fonction de la gestion coté front, remplacer cette ligne par un save
			let teamToAdd : Team|null = await this.teamService.getTeamByName(team.name);

			if (!teamToAdd) {
				console.log(`Team ${team.name} does not exist, creating it`);
				teamToAdd = team;
			}

			tournament.addTeam(teamToAdd);
		} else {
			tournament.addTeam(team);
		}

		await this.saveTournament(tournament);

		// On regénère les matchs pour prendre en compte la nouvelle équipe
		await this.generateMatches(await this.getTournament(tournament.id!));
	}

}