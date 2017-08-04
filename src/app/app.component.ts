import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Location } from '../pages/location/location';
import { Scanner } from '../pages/scanner/scanner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  options: PushOptions;
  pushObject: PushObject
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController) {
    this.initializeApp();

    platform.ready().then(() => {
         this.pushsetup();
       });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Location', component: Location },
      { title: 'Scanner', component: Scanner }
    ];
  }

  pushsetup() {
     const options: PushOptions = {
      android: {
          senderID: '<yoursenderidhere>'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {}
   };
   const pushObject: PushObject = this.push.init(options);

   pushObject.on('notification').subscribe((notification: any) => {
     if (notification.additionalData.foreground) {
       let youralert = this.alertCtrl.create({
         title: 'New Push notification',
         message: notification.message
       });
       youralert.present();
     }
   });

   pushObject.on('registration').subscribe((registration: any) => {
   console.log('wwwwww' + JSON.stringify(registration));
      //do whatever you want with the registration ID
   });

   pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
 }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // pushObject: PushObject = this.push.init(this.options);




}
