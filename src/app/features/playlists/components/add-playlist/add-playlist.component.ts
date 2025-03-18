import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../../../core/services/http-provider.service';

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-playlist.component.html',
})
export class AddPlaylistComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly httpProvider = inject(HttpProviderService);
  private readonly toastr = inject(ToastrService);

  playlistForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    songs: ['', Validators.required]
  });

  isSubmitted = false;

  addPlaylist() {
    this.isSubmitted = true;
    if (this.playlistForm.valid) {
      const playlistData = this.playlistForm.value;

      // Convertir las canciones a objetos sin id antes de enviarlas
      const songs = playlistData.songs.split('\n').map((song: string) => {
        const songData = song.split(',');
        return {
          title: songData[0]?.trim(),
          artist: songData[1]?.trim(),
          album: songData[2]?.trim(),
          releaseYear: parseInt(songData[3]?.trim(), 10),
          genre: songData[4]?.trim()
        };
      });

      const dataToSend = {
        name: playlistData.name,
        description: playlistData.description,
        songs: songs
      };

      // Enviar los datos al backend
      this.httpProvider.savePlaylist(dataToSend).subscribe({
        next: (response) => {
          this.toastr.success('Playlist added successfully!');
          setTimeout(() => this.router.navigate(['playlists', 'home']), 500);
        },
        error: (error) => {
          this.toastr.error(error.message || 'Something went wrong');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/playlists/home']);
  }
}
