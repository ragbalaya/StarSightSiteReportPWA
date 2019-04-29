import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import '../service/auth-service.service';
import { AuthServiceService } from '../service/auth-service.service';
import { AlertController } from '@ionic/angular';
import Axios from 'axios';


export class TimeSheet {
    id: string ;
    logTime: string ;
    engineerId: string ;
    engineerInfo: string ;
    siteCode: string;
    briefDescriptionOfWork: string;
    assetId: string;
    costCode: string;
    hours: string;
    transportCost: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public records: TimeSheet [];

  // tslint:disable-next-line:max-line-length
  constructor(public navCtrl: NavController, private storage: Storage, private auth:AuthServiceService , public alertController: AlertController) {
    
   }

   ngOnInit(): void {

    const that = this ;
 
    setInterval(()=>{    //<<<---    using ()=> syntax
      if(this.auth.currentUser !== undefined){
        this.getRecords();
        }
      }, 3000);

   }

   


   async getRecords(){
     const  current = this ;
     current.auth.callBackend().get('/api/v1/timesheet/history').then(function (response) {
        console.log(response.data);
        current.records = response.data ;
        console.log(current.records);
     });

   }

}
