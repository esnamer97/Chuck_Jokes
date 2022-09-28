import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteJokesComponent } from './favorite-jokes/favorite-jokes.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RandomJokesComponent } from './random-jokes/random-jokes.component';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component:LoginComponent },
  { path:'landing', component:LandingComponent },
  { path:'randomJokes', component:RandomJokesComponent },
  { path:'myJokes', component:FavoriteJokesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
