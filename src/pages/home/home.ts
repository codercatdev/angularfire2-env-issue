import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ENV } from '@app/env';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  signinLoading: Loading;
  firebase;
  user;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
      this.firebase = ENV.firebase;
      this.afAuth.authState.subscribe(
        user => {
            this.user = user
        });
  }
  login(provider: string) {
    localStorage.setItem("signin", "true");
    this.signinLoading = this.loadingCtrl.create({ content: `Signing In...` });
    this.signinLoading.present();
    switch (provider) {
      case "google": {
        this.afAuthLogin(new firebase.auth.GoogleAuthProvider());
        break;
      }
      case "facebook": {
        this.afAuthLogin(new firebase.auth.FacebookAuthProvider());
        break;
      }
      case "twitter": {
        this.afAuthLogin(new firebase.auth.TwitterAuthProvider());
        break;
      }
      case "github": {
        this.afAuthLogin(new firebase.auth.GithubAuthProvider());
        break;
      }
      default: {
        this.toastCtrl.create({
          message: 'Incorrect Signing Type.',
          duration: 3000,
          position: 'middle'
        }).present();
        break;
      }
    }
  }
  afAuthLogin(provider: firebase.auth.AuthProvider) {
    this.afAuth.auth.signInWithRedirect(provider).then(() => {
      this.signinLoading.dismiss();
    }).catch((error) => {
      console.log(error);
      this.signinLoading.dismiss();
      this.toastCtrl.create({
        message: 'Signing Failed, please try agian.',
        duration: 3000,
        position: 'middle'
      }).present();
    });
  }
  signout() {
    this.afAuth.auth.signOut();
  }
}
