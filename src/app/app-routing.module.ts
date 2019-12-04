import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)},
  { path: 'cadastro', loadChildren: () => import('./paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: '', loadChildren: () => import('./paginas/tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: 'relato', loadChildren: () => import('./paginas/relato/relato.module').then( m => m.RelatoPageModule)},
  { path: 'configuracoes', loadChildren: () => import('./paginas/configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)},
  { path: 'new-email', loadChildren: () => import('./paginas/new-email/new-email.module').then( m => m.NewEmailPageModule)},
  { path: 'new-senha', loadChildren: () => import('./paginas/new-senha/new-senha.module').then( m => m.NewSenhaPageModule)},
  { path: 'excluir-conta', loadChildren: () => import('./paginas/excluir-conta/excluir-conta.module').then( m => m.ExcluirContaPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
