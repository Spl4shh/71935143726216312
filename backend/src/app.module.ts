import { Module } from '@nestjs/common';
import { TournamentController } from './controller/tournament.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Tournament } from './model/tournament.model';
import { Team } from './model/team.model';
import { Match } from './model/match.model';
import { TournamentService } from './service/tournament.service';
import { TournamentMapper } from './controller/dto/mapper/tournament.mapper';
import { MatchMapper } from './controller/dto/mapper/match.mapper';
import { TeamMapper } from './controller/dto/mapper/team.mapper';
import { MatchController } from './controller/match.controller';
import { MatchService } from './service/match.service';
import { TeamService } from './service/team.service';
import { TeamController } from './controller/team.controller';
import { UserController } from './controller/user.controller';
import { UserMapper } from './controller/dto/mapper/user.mapper';
import { UserService } from './service/user.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // rend les var d'environnement accessibles partout
		}),
		TypeOrmModule.forRoot({
			type: 'mariadb',
			host: process.env.DB_HOST || 'localhost',
			port: parseInt(process.env.DB_PORT || '3306'),
			username: process.env.DB_USERNAME || 'root',
			password: process.env.DB_PASSWORD || 'password',
			database: process.env.DB_NAME || 'clementine_db',
			autoLoadEntities: true,
			logging: true,
			synchronize: true, // Permet de mettre a jour la base de données automatiquement 
			dropSchema: false, // True supprime la base au démarrage
		}),
		TypeOrmModule.forFeature([
			User,
			Tournament,
			Team,
			Match
		])
	],
	controllers: [
		MatchController,
		TeamController,
		TournamentController,
		UserController
	],
	providers: [
		MatchMapper,
		TeamMapper,
		TournamentMapper, 
		UserMapper,
		MatchService,
		TeamService,
		TournamentService,
		UserService
	],
})
export class AppModule { }
