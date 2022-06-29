import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'buildings',
    loadChildren: () => import('./modules/buildings/buildings.module').then( m => m.BuildingsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modules/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./modules/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
