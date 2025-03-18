import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpProviderService {
  private readonly apiUrl = environment.url;
  private readonly webApiService = inject(WebApiService);

  savePlaylist(playlistData: any): Observable<any> {
    return this.webApiService.post(`${this.apiUrl}/lists`, playlistData);
  }

  getAllPlaylists(): Observable<any[]> {
    return this.webApiService.get(`${this.apiUrl}/lists`);
  }

  getPlaylistByName(name: string): Observable<any> {
    return this.webApiService.get(`${this.apiUrl}/lists/${encodeURIComponent(name)}`);
  }
  
  deletePlaylistById(name: string): Observable<any> {
    return this.webApiService.delete(`${this.apiUrl}/lists/${encodeURIComponent(name)}`);
  }

  getAllUser(): Observable<any> {
    return this.webApiService.get(`${this.apiUrl}`);
  }

  deletePlaylistByName(name: string): Observable<any> {
    return this.webApiService.delete(`${this.apiUrl}/lists/${encodeURIComponent(name)}`);
  }

  getUserById(userId: number): Observable<any> {
    return this.webApiService.get(`${this.apiUrl}/${encodeURIComponent(userId)}`);
  }

  saveUser(model: any): Observable<any> {
    return this.webApiService.post(`${this.apiUrl}`, model);
  }

  updateUser(userId: number, model: any): Observable<any> {
    return this.webApiService.put(`${this.apiUrl}/${encodeURIComponent(userId)}`, model);
  }
}
