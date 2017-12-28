import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTeamPage } from './home-team';

@NgModule({
  declarations: [
    HomeTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTeamPage),
  ],
})
export class HomeTeamPageModule {}
