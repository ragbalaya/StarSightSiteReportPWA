import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import  'axios';
import { from } from 'rxjs';
import Axios from 'axios';
import { store } from '@angular/core/src/render3';
import { NavController } from '@ionic/angular';


export class User {
  name: string;
  email: string;
  password: string;
  token: string ;
}

export class Response {
  code: string ;
  reeason : string ;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private store: Storage , public navCtrl: NavController) { }

  public currentUser: User;
  public url =  'https://sitereport.starsightlimited.com' ;
 // public url =  'http://localhost:5000' ;


  public async login(user: User) {
    const loginRes = new Response();
    const here =  this;
   return await Axios.post(here.url + '/oauth/token' ,
     {
       userName : user.name ,
       password : user.password
     }
    ).then(function (response) {
      const res = new Response();
      res.code = '00';
      res.reeason = 'successfull';
      console.log(response);
      here.currentUser = user ;
      here.currentUser.token = response.data.token ;
      here.store.set('token', here.currentUser.token);

       

      return res ;
    })
    .catch(function (error) {
      console.log(error)
      const res = new Response();
      res.code = '99';
      res.reeason = error.response.data.respDesc;
      return res ;
    });
  }

  public callBackend() {

    if(this.currentUser == undefined || this.currentUser.token == undefined){
      this.navCtrl.navigateRoot('');
    }

    return Axios.create({
      baseURL: this.url,
      timeout: 20000,
      headers: {'Authorization': 'Bearer '+ this.currentUser.token}
    });
  }

   public async isLoggedIn(){
    const token = this.store.get('token').then((val) =>{
      console.log('token '+ val)
      return val !== '';
    });
  }

  public async getCurrentUser (){
    return this.currentUser ;
  }

  public logout () {
    this.currentUser = undefined ;
    this.store.clear();
    console.log('about to logout user...');
  }
}
