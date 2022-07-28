import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
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
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'organizations',
    loadChildren: () => import('./modules/organizations/organizations.module').then( m => m.OrganizationsPageModule)
  },
  {
    path: 'legislation-normatives',
    loadChildren: () => import('./modules/legislation-normatives/legislation-normatives.module').then( m => m.LegislationNormativesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
