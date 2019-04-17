import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
//import * as firebaseui from 'firebaseui';
import firebaseConfig from '../../app/firebase-config';
import scriptjs from 'scriptjs';
import {FirebaseAuthProvider} from "../../providers/auth/firebase-auth";
import {AuthProvider} from "../../providers/auth/auth";
import {MainPage} from "../main/main";

declare const firebaseui;
(<any>window).firebase = firebase;

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login-phone-number',
    templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private firebaseAuth: FirebaseAuthProvider,
        private authService: AuthProvider
    ) {
    }

    ionViewDidLoad() {
        /*this.firebaseAuth.getToken().then((token) => {
            console.log(token), (error) => console.log(error);
        });*/

        const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.authService
                    .login()
                    .subscribe((token) => {
                        this.redirectToMainPage();
                    }, (responseError) => {
                        this.redirectToCustumerCreatePage();
                    });
                unsubscribed();
            }
        });
        this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
    }

    redirectToMainPage() {
        this.navCtrl.setRoot(MainPage);
    }

    redirectToCustumerCreatePage() {

    }

}
