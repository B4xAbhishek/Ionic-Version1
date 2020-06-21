import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

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


  async logout() {
		
      await this.afAuth.signOut();
      this.presentAlert('Logout', 'Successfully Logged out')
			this.router.navigate(['/home'])

  }

}
