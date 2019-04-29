import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import '../service/auth-service.service';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private nav: NavController , private auth : AuthServiceService){

  }

  ngOnInit(): void {

    console.log('working');
    this.auth.logout() ;
    this.nav.navigateRoot('');
  }
}
