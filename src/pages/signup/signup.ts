import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { UtisProvider } from '../../providers/utis/utis';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userSignup: User = { city: '', email: '', name: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProvider: UserProvider, private utisProvider: UtisProvider) {
  }

  async signup(form: NgForm) {
    if(form.form.invalid) {
      this.utisProvider.showToast('Atenção todos os campos são obrigatórios.')
      return;
    }
    await this.userProvider.signup(form.value)
    await this.userProvider.login({ email: form.value.email, password: form.value.password });
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
