import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { UtisProvider } from '../../providers/utis/utis';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public pageSignup;

  public dataPassport = { email: '', password: '' };


  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
    private utisProvider: UtisProvider ) {
  }

  async login(form: NgForm) {
    if(form.form.invalid) {
      this.utisProvider.showToast('Todos os campos são obrigatórios!');
      return;
    }
    try {
      await this.userProvider.login(form.value);
      this.navCtrl.setRoot(HomePage);
    } catch(error) {
      this.utisProvider.showToast(error.message);
    }
  }

  ionViewDidLoad() {
    this.pageSignup = SignupPage;
  }

}
