import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpProviderService } from '../../../../core/services/http-provider.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
})
export class HomeComponent implements OnInit {
  private readonly playlistListSubject = new BehaviorSubject<any[]>([]);
  playlistList$: Observable<any[]> = this.playlistListSubject.asObservable();

  private readonly router = inject(Router);
  private readonly modalService = inject(NgbModal);
  private readonly toastr = inject(ToastrService);
  private readonly httpProvider = inject(HttpProviderService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.getAllPlaylists();
  }

  getAllPlaylists() {
    this.httpProvider.getAllPlaylists().pipe(
      tap(playlists => this.playlistListSubject.next(playlists)),
      catchError(error => {
        console.error("Error in request:", error);
        return of([]);
      })
    ).subscribe();
  }

  addPlaylist() {
    this.router.navigate(['playlists', 'add-playlist']);
  }

  deletePlaylistConfirmation(playlist: any) {
    const modalRef = this.modalService.open(PopUpComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.deletePlaylist(playlist.name);  // Usar el nombre de la playlist
      }
    }).catch(() => {});
  }

  deletePlaylist(playlistName: string) {
    this.httpProvider.deletePlaylistByName(playlistName).pipe(
      tap(() => {
        this.toastr.success('Playlist deleted successfully');
        this.getAllPlaylists();
      }),
      catchError((error) => {
        this.toastr.error('Error deleting playlist');
        return of(null);
      })
    ).subscribe();
  }

  logout() {
    this.authService.logout();
    this.toastr.info('Session closed', 'Goodbye');
    this.router.navigate(['/auth/login']);
  }
}
