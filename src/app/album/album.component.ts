import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { SpotifyService } from '../spotify.service';
import { Album } from '../album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: Album;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.spotifyService.getAlbum(params['id']))
      .subscribe(
        response => { this.album = response },
        error => { console.log(`error: ${error}`) }  );
  }

}
