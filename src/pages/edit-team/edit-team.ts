import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from '../../models/team/team.model';
import { TeamListService } from '../../services/team-list/team-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/player/player.model';
import { PlayerListService } from '../../services/player-list/player-list.service';

/**
 * Generated class for the EditTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-team',
  templateUrl: 'edit-team.html',
})
export class EditTeamPage {
team: Team;
playerList$: Observable<Player[]>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private teamlist: TeamListService, 
    private toast: ToastService,
    private playerlist: PlayerListService) {
      this.playerList$ = this.playerlist
      .getPlayerList()  //DB LIST
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

  ionViewWillLoad() {
    this.team = this.navParams.get('team');
  }


  saveTeam(team: Team){
this.teamlist.editTeam(team)
    .then(() => {
      this.toast.show(`${team.name} edited !`);
      this.navCtrl.setRoot('HomeTeamPage'); // !!
    });
  }

  removeTeam(team: Team){
    this.teamlist.removeTeam(team)
    .then(() => {
      this.toast.show(`${team.name} deleted !`);
      this.navCtrl.setRoot('HomeTeamPage'); // !!
    });
  }
}