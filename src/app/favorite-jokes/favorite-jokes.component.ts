import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke-service';

@Component({
  selector: 'app-favorite-jokes',
  templateUrl: './favorite-jokes.component.html',
  styleUrls: ['./favorite-jokes.component.css']
})
export class FavoriteJokesComponent implements OnInit {

  list: Array<any>;

  constructor(private jokeService: JokeService) { 
    this.list = [];
  }

  ngOnInit(): void {
    this.callJokes();
  }

  private callJokes(){
    let id = sessionStorage.getItem('id') as string;
    this.jokeService.getJokes(parseInt(id)).subscribe(data =>{
      console.log("DATA JOKES", data);
      this.list = data;
    });
  }

  public deleteFavoriteJoke(item:any){
    this.jokeService.deleteJokes(item.id).subscribe(resp => {
      if(!resp){
        alert("Error when save");
        return;
      }
      this.callJokes();
    });
  }
}
