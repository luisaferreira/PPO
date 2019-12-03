import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home',
        children: [{ path: '', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)}]
      },
      { path: 'mapa',
        children: [{ path: '', loadChildren: () => import('../mapa/mapa.module').then(m => m.MapaPageModule)}]
      },
      { path: 'perfil',
        children: [{ path: '', loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)}]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
