import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JokeDAO } from '../models/joke.dao';
import { JokeUserDAO } from '../models/joke-user.dao';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:8080/getRandomJoke';
  configUrl2 = 'http://localhost:8080/saveJokes';
  configUrl3 = 'http://localhost:8080/getUserJokes';
  configUrl4 = 'http://localhost:8080/deleteJoke';

  getRandomJoke(){
    return this.http.get<JokeDAO>(this.configUrl, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  postJoke(joke: JokeUserDAO){
    return this.http.post<boolean>(this.configUrl2, joke, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getJokes(id:number){
    return this.http.get<Array<any>>(this.configUrl3+'?id='+id.toString(), httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteJokes(id:number){
    return this.http.post<boolean>(this.configUrl4, id, httpOptions).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}