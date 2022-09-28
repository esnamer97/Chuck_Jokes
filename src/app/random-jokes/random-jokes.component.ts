import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeUserDAO } from '../models/joke-user.dao';
import { JokeDAO } from '../models/joke.dao';
import { JokeService } from '../services/joke-service';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.css']
})
export class RandomJokesComponent implements OnInit {

  joke:JokeDAO;

  constructor(private jokeService: JokeService, private route: ActivatedRoute,
    private router: Router) { 
    this.joke = new JokeDAO();
  }

  ngOnInit(): void {
    this.searchJoke();
  }

  private searchJoke(){
    this.jokeService.getRandomJoke().subscribe(data => {
      this.joke = data;
    });
  }

  public saveJoke(){
    let data: JokeUserDAO = new JokeUserDAO();
    let id = sessionStorage.getItem('id') as string;
    data.joke = this.joke;
    data.userId = parseInt(id);
    console.log("DATA", data.joke);
    console.log("ID", data.userId);
    this.jokeService.postJoke(data).subscribe(resp => {
      if(!resp){
        alert("Error when save the joke");
        return;
      }
      this.router.navigate(['/landing']);
    });
  }
}
