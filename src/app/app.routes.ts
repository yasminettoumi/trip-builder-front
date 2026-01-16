import { Routes } from '@angular/router';
import { TripSearchComponent } from './pages/trip-search/trip-search.component';
import { TripDetailsComponent } from './pages/trip-details/trip-details.component';


export const routes: Routes = [
  { path: '', component: TripSearchComponent },
  { path: 'trips/:id', component: TripDetailsComponent }
];
