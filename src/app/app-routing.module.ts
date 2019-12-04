import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)},
  { path: 'cadastro', loadChildren: () => import('./paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: '', loadChildren: () => import('./paginas/tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: 'relato', loadChildren: () => import('./paginas/relato/relato.module').then( m => m.RelatoPageModule)},
  { path: 'configuracoes', loadChildren: () => import('./paginas/configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)},
  { path: 'redSenha',
    loadChildren: () => import('./paginas/redSenha/redSenha.module').then( m => m.redSenhaPageModule)
  },
  {
    path: 'redemail',
    loadChildren: () => import('./paginas/redemail/redemail.module').then( m => m.RedemailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
