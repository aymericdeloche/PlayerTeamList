import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../models/team/team.model';
import { TeamListService } from '../../services/team-list/team-list.service';
@IonicPage()
@Component({
  selector: 'page-home-team',
  templateUrl: 'home-team.html'
})
export class HomeTeamPage {
teamList$: Observable<Team[]>;
  constructor(public navCtrl: NavController, private teamlist: TeamListService) {
    this.teamList$ = this.teamlist
      .getTeamList()  //DB LIST
      .snapshotChanges() // KEY AND VALUE
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }))
        }
      );
  }

}

