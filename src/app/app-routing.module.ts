import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)},
  { path: 'cadastro', loadChildren: () => import('./paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: '', loadChildren: () => import('./paginas/tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: 'relato', loadChildren: () => import('./paginas/relato/relato.module').then( m => m.RelatoPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
