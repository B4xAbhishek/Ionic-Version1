import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { firebase } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password:string = "";

  constructor(public afAuth: AngularFireAuth, public router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}


  async login() {
		try {
			const res = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
			this.router.navigate(['/welcome'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
        console.log("User not found")
        this.presentAlert('Sorry', 'Please Enter a valid email id or password')
			}
		}
	}

}


