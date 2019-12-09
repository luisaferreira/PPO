import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { RelatosService } from 'src/app/services/relatos.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;

  constructor(
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth
  ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }

}
