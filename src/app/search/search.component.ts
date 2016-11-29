import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from '../spotify.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  searchResults: Artist[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  searchMusic(searchStr): void {
    console.log("searching spotify");
    this.spotifyService.searchMusic(searchStr)
      .subscribe(response => this.searchResults = response.artists.items)
      //.subscribe(res => console.log(res.artists.items))
  }

}
