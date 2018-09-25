import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public pageSignup;

  public dataPassport = { email: '', password: '' };


  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private toastCtrl: ToastController) {
  }

  async login(form: NgForm) {
    if(form.form.invalid) {
      this.showToast('Todos os campos são obrigatórios!');
      return;
    }
    try {
      await this.userProvider.login(form.value);
      this.navCtrl.setRoot(HomePage);
    } catch(error) {
      this.showToast(error.message);
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Ok'
    }).present();
  }

  ionViewDidLoad() {
    this.pageSignup = SignupPage;
  }

}
