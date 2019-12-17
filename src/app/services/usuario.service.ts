import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(
    private afstore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.usuariosCollection = this.afstore.collection<Usuario>('Usuários')
  }

  //listar informações de todos os usuários
  getUsuarios() {
    return this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  //pegar informações de um específico
  getUsuario(id: string) {
    return this.usuariosCollection.doc<Usuario>(id).valueChanges();
  }

  //atualizar informações do usuário
  updateUsuario(id: string, usuario: Usuario) {
    return this.usuariosCollection.doc<Usuario>(id).update(usuario);
  }

  //deletar  as informações dos usuários
  deleteUsuario(id: string) {
    return this.usuariosCollection.doc(id).delete();
  }

  //adicionar usuarios
  async addUsuario(usuario: Usuario) {

    if (usuario.senha != usuario.confsenha) {
      return console.error("As senhas não são iguais");
    }

    try {
      const nvUsuario = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);

      const nvUsuarioObject = Object.assign({}, usuario)
      delete nvUsuarioObject.senha; //insenta a senha de ser enviada ao banco 
      delete nvUsuarioObject.confsenha; //insenta a confirmação de senha de ser enviada ao banco 

      await this.afstore.collection('Usuários').doc(nvUsuario.user.uid).set(nvUsuarioObject) //envia para o banco todos os dados ao invés de apenas e-mail e senha


    } catch (error) {
      console.log(error);

    }


  }


  //adicionar informações de usuários não será implementado aqui e sim em cadastro.page.ts por N motivos hihi

}
