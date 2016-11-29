import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { SpotifyService } from '../spotify.service';
import { Artist } from '../artist';
import { Album } from '../album';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: Artist;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.spotifyService.getArtistAndAlbums(params['id']))
      .subscribe(
        response => {
          this.artist = response[0],
          this.artist.albums = response[1].items
        },
        error => { console.log(`error: ${error}`) }  );
  }
}
