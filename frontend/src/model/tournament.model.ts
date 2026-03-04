import { Match } from "./match.model";
import { Team } from "./team.model";
import { User } from "./user.model";

export interface Tournament {
    id?: number;
    name: string;
    date: Date;
    description: string;
    creator: User;
    teams?: Team[];
    matches?: Match[];
}