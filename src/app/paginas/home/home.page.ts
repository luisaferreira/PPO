import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { RelatosService } from 'src/app/services/relatos.service';
import { Subscription, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;
  private relatoId: string = null;
  private loading: any;
  searchterm: String; 
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable(); 
  endobs = this.endAt.asObservable();  
  relato; 

  constructor(
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afs: AngularFirestore
  ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data.filter(rel => rel.resolvido === false );
    });
  }

  ngOnInit() {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data.filter(rel => rel.resolvido === false ).sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
    });
    combineLatest(this.startobs, this.endobs).subscribe((value)=> {
      this.firequery(value[0], value[1]).subscribe((relato) => {
        this.relatos = relato; 
      })
    })
  }

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }
  
  search($event){
    let q = $event.target.value; 
    this.startAt.next(q);
    this.endAt.next(q+"\uf8ff");
  }
  
  firequery(start, end){
    return this.afs.collection('Denúncias', ref => ref.limit(5).orderBy('ocorrido').startAt(start).endAt(end)).valueChanges();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Aguarde, por favor..."
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    return toast.present();
  }

}
