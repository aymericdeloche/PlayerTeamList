import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from './../../models/team/team.model';
@Injectable()
export class TeamListService {
    private teamListRef = this.db.list<Team>('team-list');
    
    constructor(private db: AngularFireDatabase){
   }

   getTeamList() {
       return this.teamListRef;
   }

   addTeam(team: Team) {
       return this.teamListRef.push(team);
   }

   editTeam(team: Team) {
        return this.teamListRef.update(team.key, team);
   }

   removeTeam(team: Team) {
       return this.teamListRef.remove(team.key);
   }
}