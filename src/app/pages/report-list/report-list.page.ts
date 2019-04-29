import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.page.html',
  styleUrls: ['./report-list.page.scss'],
})
export class ReportListPage implements OnInit {

  public reportsConfig : any ;
  constructor(private backend: AuthServiceService , private navCrtl : NavController ,private router: Router , private store: Storage) { }

  ngOnInit() {

    
  }

  ionViewWillEnter(){
    let current = this ;
    this.backend.callBackend().get("/api/v1/report/all").then(function (response) {
      console.log(response.data);
      current.reportsConfig = response.data ;
      console.log(current.reportsConfig);
   });
  }



  create(report: any ){
    console.log("record is "+ report.name);
     this.store.set('selected', report);
     this.navCrtl.navigateForward('tabs/new-report');
   
  }

}
