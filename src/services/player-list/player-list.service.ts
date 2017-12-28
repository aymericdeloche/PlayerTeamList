
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Player } from './../../models/player/player.model';
@Injectable()
export class PlayerListService {
    private playerListRef = this.db.list<Player>('player-list');
    
    constructor(private db: AngularFireDatabase){
   }

   getPlayerList() {
       return this.playerListRef;
   }

   addPlayer(player: Player) {
       return this.playerListRef.push(player);
   }

   editPlayer(player: Player) {
        return this.playerListRef.update(player.key, player);
   }

   removePlayer(player: Player){
       return this.playerListRef.remove(player.key);
   }
}