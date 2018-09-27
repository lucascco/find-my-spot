import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';
import { PaymentsPage } from '../pages/payments/payments';
import { HelpPage } from '../pages/help/help';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  isLogged: boolean;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private userProvider: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Estabelecimentos', component: HomePage },
      { title: 'Pagamentos', component: PaymentsPage },
      { title: 'Perfil', component: ProfilePage },
      { title: 'Ajuda', component: HelpPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.splashScreen.hide();

      this.userProvider.actionsAuth.subscribe(auth => {
        this.isLogged = true;
        if (!auth.userLogged) {
          this.isLogged = false;
          this.openPage({component: LoginPage});
        } else {
          this.openPage({component: ProfilePage});
        }
      });
      this.userProvider.checkLogged();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userProvider.logout();
  }
}
