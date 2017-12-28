import { Player } from './../../models/player/player.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { Team } from '../../models/team/team.model';
import { Observable } from 'rxjs/Observable';
import { TeamListService } from '../../services/team-list/team-list.service';

/**
 * Generated class for the EditPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-player',
  templateUrl: 'edit-player.html',
})
export class EditPlayerPage {
player: Player;
teamList$: Observable<Team[]>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private playerlist: PlayerListService, 
    private toast: ToastService,
    private teamlist: TeamListService) {
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

  ionViewWillLoad() {
    this.player = this.navParams.get('player');
  }


  savePlayer(player: Player){
this.playerlist.editPlayer(player)
    .then(() => {
      this.toast.show(`${player.firstname} ${player.lastname} edited !`);
      this.navCtrl.setRoot('HomePage');
    });
  }

  removePlayer(player: Player){
    this.playerlist.removePlayer(player)
    .then(() => {
      this.toast.show(`${player.firstname} ${player.lastname} deleted !`);
      this.navCtrl.setRoot('HomePage');
    });
  }
}
