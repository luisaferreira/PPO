import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Geocoder, Marker } from '@ionic-native/google-maps';
import { Router, NavigationExtras } from '@angular/router';
import { RelatosService } from 'src/app/services/relatos.service';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatoPage } from '../relato/relato.page';
import { Subscription } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;  //faz referência ao identificador da div

  private loading: any;
  private mapa: GoogleMap;
  public pesquisa: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public PesResult = new Array<any>();
  public local: any;
  private infoLocal;
  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;

  constructor(
    private platform: Platform, //usado para poder acessar a largura e altura do dispositivo
    private loadingCtrl: LoadingController,
    private ngZone: NgZone,
    private router: Router,
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth
  ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data;
    });
  }

  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;

    //setando o tamanho do mapa
    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    //chamando o mapa
    this.loadMap();
  }

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }

  async loadMap() {
    await this.presentLoading();

    //essa parte agr é necessária pra o mapa rodar no browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAAxRBa2wAkEXfXu4x09nnLps_cXajt4lw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAAxRBa2wAkEXfXu4x09nnLps_cXajt4lw'
    });

    //setando as informações do mapa
    const mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    }

    this.mapa = GoogleMaps.create(this.mapElement, mapOptions);

    try {
      await this.mapa.one(GoogleMapsEvent.MAP_READY)

      //captando a localização atual do usuário, PS.: SÓ SERÁ FEITO SE O USUÁRIO PERMITIR
      const myLocation: MyLocation = await this.mapa.getMyLocation();

      //pra dar zoom
      await this.mapa.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      for (let i = 0; i < this.relatos.length; i++) {
        if (this.relatos[i].resolvido == false) {
          let marcadorLocal: Marker = this.mapa.addMarkerSync({
            icon: '#000',
            animation: GoogleMapsAnimation.BOUNCE,
            position: this.relatos[i].latLng
          });
        }
      }

    } catch (error) {
      console.error(error);
      console.log(error);
    } finally {
      this.loading.dismiss();
    }


  }

  async addMarker(item: any) {
    try {
      this.pesquisa = '';
      this.local = item;
      console.log(item);

      //pegando a latitude e a longitude dos pontos do mapa
      const info: any = await Geocoder.geocode({ address: this.local.description });

      //adicionando marcador
      let marcadorLocal: Marker = this.mapa.addMarkerSync({
        icon: '#000',
        animation: GoogleMapsAnimation.BOUNCE,
        position: info[0].position
      });

      await this.mapa.moveCamera({
        target: info[0].position,
        zoom: 18
      });

      this.infoLocal = {
        endereco: this.local.description,
        latLng: info[0].position
      }

      let navigationExtras: NavigationExtras = {
        state: {
          infoLocal: this.infoLocal
        }
      };
      this.router.navigate(['relato'], navigationExtras);

    } catch (error) {
      console.error(error);
    }
  }

  pesquisaChanged() {
    if (!this.pesquisa.trim().length) return; //o trim retira os espaços em branco do inicio e final

    this.googleAutocomplete.getPlacePredictions({
      input: this.pesquisa
    }, predictions => {
      this.ngZone.run(() => {
        this.PesResult = predictions;
      });
    });
  }

  getLgnLat() {

  }

  // async voltar(){
  //   try {
  //     await this.mapa.clear();
  //     this.local = null;
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();
  }

}
