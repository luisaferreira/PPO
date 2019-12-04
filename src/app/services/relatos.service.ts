import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Relato } from '../interfaces/relato';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelatosService {

  private relatosCollection: AngularFirestoreCollection<Relato>;

  constructor(
    private afstore: AngularFirestore
    ) {
    this.relatosCollection = this.afstore.collection<Relato>('Denúncias');
  }

  //listar todos os relatos
  getRelatos() {
    return this.relatosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  //adicionar um relato
  addRelato(relato: Relato) {
    return this.relatosCollection.add(relato);
  }
  //pegar um relato específico
  getRelato(id: string) {
    return this.relatosCollection.doc<Relato>(id).valueChanges();
  }

  //atualizar o relato
  updateRelato(id: string, relato: Relato) {
    return this.relatosCollection.doc<Relato>(id).update(relato);
  }

  deleteRelato(id: string) {
    return this.relatosCollection.doc(id).delete();
  }
}
