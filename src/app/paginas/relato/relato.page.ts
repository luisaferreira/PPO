import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatosService } from 'src/app/services/relatos.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.page.html',
  styleUrls: ['./relato.page.scss'],
})
export class RelatoPage implements OnInit {

  private relato: Relato = {};
  private relatoId: string = null;
  private relatoSubscription: Subscription

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { 
    this.relatoId = this.activatedRoute.snapshot.params['id'];

    if (this.relatoId) this.loadRelato();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.relatoSubscription) this.relatoSubscription.unsubscribe();
  }

  loadRelato() {
    this.relatoSubscription = this.relatosService.getRelato(this.relatoId).subscribe(data => {
      this.relato = data;
    });
  }

  async envDenuncia() {
    this.relato.userId = this.afAuth.auth.currentUser.uid;
  
    this.relato.createdAT = new Date().getDate();

    try{
      await this.relatosService.addRelato(this.relato);

      // this.navCtrl.navigateBack('perfil');
    } catch (error) {
      console.log(error);
    }
  }

}
