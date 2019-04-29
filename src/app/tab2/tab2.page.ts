import { Component } from '@angular/core';
import { TimeSheet } from '../tab1/tab1.page';
import { AuthServiceService } from '../service/auth-service.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public form: TimeSheet  = new TimeSheet();


  constructor(public auth : AuthServiceService , public nav: NavController ,  public toastController: ToastController){}


  public save(){
    console.log(this.form);
    this.auth.callBackend().post('/api/v1/timesheet/new',this.form).then( (response) => {
       console.log(response);

       if(response.data.respCode == '00'){

        this.nav.navigateForward('tabs/tab1');

       } else  {
         this.presentAlert(response.data.respDesc);
       }
    }).catch((error) => {
       console.log(error);
       this.presentAlert('Error occured !');
    })
  }

  async presentAlert(message: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }


}
