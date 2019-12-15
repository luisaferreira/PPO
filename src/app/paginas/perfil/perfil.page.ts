import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides } from '@ionic/angular';
import { Relato } from 'src/app/interfaces/relato';
import { Subscription } from 'rxjs';
import { RelatosService } from 'src/app/services/relatos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides

  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;

  constructor(
    private relatosService: RelatosService
   ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }
  
  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }
}
