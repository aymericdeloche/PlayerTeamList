import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from '../../models/team/team.model';
import { ToastService } from '../../services/toast/toast.service';
import { TeamListService } from '../../services/team-list/team-list.service';

/**
 * Generated class for the AddTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-team',
  templateUrl: 'add-team.html',
})
export class AddTeamPage {
  team: Team = {
    name: '',   
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private teamlist: TeamListService,
    private toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTeamPage');
  }

  addTeam(team: Team){
    this.teamlist.addTeam(team).then(ref => {
      this.toast.show
      (`${team.name} added to the list!`);
      this.navCtrl.setRoot('HomeTeamPage', { key: ref.key }) // !! 
    })
  }


}
