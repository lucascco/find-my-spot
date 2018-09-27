import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UtisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtisProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello UtisProvider Provider');
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Ok',
      duration: 5000
    }).present();
  }

}
