import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string = "";
  password:string = "";
  cpassword:string = "";
  pin:string = "";
  number:string = "";

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
  async register() {
		if(this.password !== this.cpassword) {
      this.presentAlert('Error', 'Entered Password does not match')
      return console.error("Passwords don't match")
      
		}
		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
			this.presentAlert('Success', 'You are registered!')
			this.router.navigate(['/welcome'])

		} catch(error) {
			console.dir(error)
		}
	}


}
