import { Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home/home.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';

export default function playlistRoutes(): Routes {
  return [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'add-playlist', component: AddPlaylistComponent, canActivate: [AuthGuard] }
  ];
}
