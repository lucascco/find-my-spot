import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UtisProvider } from '../../providers/utis/utis';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userLogged: User;
  @ViewChild('inputPassword') inputPassword: HTMLInputElement;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
    public alertCtrl: AlertController, private utisProvider: UtisProvider) {
  }

  async changePassword(newPassword: string) {
    if(!newPassword.trim()) {
      this.utisProvider.showToast('O campo Nova Senha não pode ser em branco.');
      return;
    }
    await this.userProvider.changePassword(newPassword);
    this.utisProvider.showToast('Senha alterada com sucesso!');
    this.inputPassword.value = '';

  }

  removeAccount() {
    this.createDialog('Deseja apagar a sua conta?', 'Remover Conta')
      .present();
  }

  private createDialog(message, title) {
    return this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.deleteAccount()
        },
        { text: 'Não', role: 'cancel' }
      ]
    });
  }

  private deleteAccount() {
    this.userProvider.deleteAccount()
      .then(() => this.utisProvider.showToast('Conta apagada com sucesso!'));
  }

  ionViewDidLoad() {
    this.userLogged = this.userProvider.auth.userLogged;
    console.log('ionViewDidLoad', this.userLogged);
    console.log('ionViewDidLoad ProfilePage');
  }

}
