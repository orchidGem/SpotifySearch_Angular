import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Artist } from './artist';

@Injectable()
export class SpotifyService {

  private searchUrl: string;
  private artistUrl: string;
  private albumsByArtistUrl: string;
  private albumUrl: string;

  constructor(private http: Http) { }

  searchMusic(searchStr: string, type="artist") {
    this.searchUrl = `https://api.spotify.com/v1/search?q=${searchStr}&type=${type}`;
    return this.http.get(this.searchUrl).map(response => response.json());
  }

  getArtistAndAlbums(id: string) {
    return Observable.forkJoin(
      this.getArtist(id),
      this.getArtistAlbums(id)
    );
  }

  getArtist(id: string) {
    this.artistUrl = `https://api.spotify.com/v1/artists/${id}`;
    return this.http.get(this.artistUrl).map(response => response.json());
  }

  getArtistAlbums(id: string) {
    this.albumsByArtistUrl = `https://api.spotify.com/v1/artists/${id}/albums`;
    return this.http.get(this.albumsByArtistUrl).map(response => response.json());
    //return this.artistUrl;
  }

  getAlbum(id: string) {
    this.albumUrl = `https://api.spotify.com/v1/albums/${id}`;
    return this.http.get(this.albumUrl).map(response => response.json());
  }

}
