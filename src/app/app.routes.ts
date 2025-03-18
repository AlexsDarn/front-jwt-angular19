import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'playlists', loadChildren: () => import('./features/playlists/playlist.routes').then(m => m.default()) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.default()) },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];