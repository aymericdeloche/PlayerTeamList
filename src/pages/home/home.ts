import { Player } from './../../models/player/player.model';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
playerList$: Observable<Player[]>;
  constructor(public navCtrl: NavController, private playerlist: PlayerListService) {
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

}
