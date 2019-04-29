import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.page.html',
  styleUrls: ['./new-report.page.scss'],
})
export class NewReportPage implements OnInit {

  public configId: any ;
  public reports: any ;
  public clients: any [] = [];
  public sites: any [] = [];
  public name: String ;
  public data: String [] = [];
  public clientId: any ;
  public siteId: any ;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private store: Storage , private backend: AuthServiceService , public toastController: ToastController , public nav:NavController) { }

  ngOnInit() {

    

  }

  ionViewDidEnter(){
    const current = this;
    this.store.get('selected').then((parameter) => {
      console.log('Received Parameter: ' + parameter.dataAttributes);
      this.configId = parameter.id;
      this.name = parameter.name ;
      this.reports = parameter.fields ;

    });

    this.backend.callBackend().get('/api/v1/client/all').then(function (response) {
      console.log(response.data);
      current.clients = response.data ;
      console.log(current.clients);
   });

    console.log('data is currently ' + this.data.length);
  }


  selectClient() {
    console.log(this.clientId);
    const current = this;

    let t = this.toast('Loading sites');

    this.backend.callBackend().get('/api/v1/client/' + this.clientId + '/site').then(function (response) {
      console.log(response.data);
      current.sites = response.data ;
      console.log(current.sites);
   });
  }


  save() {
    let req = '';

    let vals = '' ;

    for (const entry of this.reports) {
      const a = '"' + entry.fieldName + '" : "' +  this.data[this.reports.indexOf(entry)] + '" ' ;

      vals = vals + ','  + a ;

    }

    vals = vals.substr(1);
    const obj = '{' + vals + '}';

    req = JSON.parse(obj);

    const data = {
       reportConfigId : this.configId,
       siteId : this.siteId ,
       submittedData : req
    };

    console.log('request to server would be ' + JSON.stringify(data));


  //   this.backend.callBackend().post('/api/v1/report/new', data).then( (response) => {
  //     console.log(response);

  //     if(response.data.respCode === '00') {

  //       this.toast(response.data.respDesc);
  //       this.nav.navigateForward('tabs');

  //     } else  {
  //       this.toast(response.data.respDesc);
  //     }
  //  }).catch((error) => {
  //     console.log(error);
  //     this.toast('Error occured !');
  //  });

  }

  async toast (message: string){
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: false,
      position: 'top',
      duration: 2000
    });
    toast.present();

    return toast ;
  }

  async dismiss(toast: any){
    toast.dismiss();
  }


}
