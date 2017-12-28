import { Player } from './../../models/player/player.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerListService } from './../../services/player-list/player-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { TeamListService } from '../../services/team-list/team-list.service';
import { Team } from '../../models/team/team.model';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the AddPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html',
})
export class AddPlayerPage {
player: Player = {
  firstname: '', 
  lastname: '',
  age: undefined,
  team: '',
}
teamList$: Observable<Team[]>;
  constructor(
    public navCtrl: NavController,
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlayerPage');
  }


  addPlayer(player: Player){
    this.playerlist.addPlayer(player).then(ref => {
      this.toast.show
      (`${player.firstname} ${player.lastname} added to the list!`);
      this.navCtrl.setRoot('HomePage', { key: ref.key })
    })
  }
}
