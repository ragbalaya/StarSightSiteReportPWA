import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import '../../service/auth-service.service';
import { AuthServiceService, User } from '../../service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm : User  = new User();

  // tslint:disable-next-line:max-line-length
  constructor(public navCtrl: NavController, private storage: Storage, private auth:AuthServiceService , public toastController: ToastController) { }

  ngOnInit() {
    
  }



  async processLogin() {
   console.log('login would be processed here !!!!');
   console.log(this.loginForm.name);
   console.log(this.loginForm.password);

   this.presentAlert("Processing.....")
    const res = await this.auth.login(this.loginForm);

    if (res.code === '00') {
      this.navCtrl.navigateForward('tabs');
    } else {
      console.log('error' + res.reeason) ;
      this.presentAlert(res.reeason);
    }

  }

  async presentAlert(message: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: false,
      position: 'top',
      duration: 2000
    });
    toast.present();
    
    
  }

}
