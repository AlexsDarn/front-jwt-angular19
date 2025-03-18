import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../../../core/services/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-playlist',
  standalone: true,
  templateUrl: './view-playlist.component.html',
  imports: [CommonModule, RouterModule],
})
export class ViewPlaylistComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly httpProvider = inject(HttpProviderService);

  playlistName!: string;
  playlistDetail: any = null;

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.playlistName = params['name'];
          return this.playlistName ? this.httpProvider.getPlaylistByName(this.playlistName) : of(null);
        })
      )
      .subscribe({
        next: playlist => {
          if (playlist) {
            this.playlistDetail = playlist;
          }
        },
        error: () => {
          this.toastr.error('Playlist no encontrada');
          this.router.navigate(['/playlists/home']); // Redirige a la página de playlists si no se encuentra
        },
      });
  }
}
