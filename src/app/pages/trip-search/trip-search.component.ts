import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

interface Airport {
  code: string;
  city: string;
}
interface TripResult {
  trip_id: number;
  type: string;
  total_price: number;
  flights: any[];
}

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  RouterModule],
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css']
})
export class TripSearchComponent implements OnInit {

  airports: Airport[] = [];
  form!: FormGroup;
  trip: TripResult | null = null;
  loading = false;
  error: string | null = null;
  today!: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0]; 
    
    this.form = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departure_date: ['', Validators.required],
      return_date: [''],
      type: ['one_way', Validators.required]
    });

    // Chargement des aéroports
    this.api.getAirports().subscribe((res: Airport[]) => {
      this.airports = res;
    });
  }

 search(): void {
  if (this.form.invalid) return;

  this.loading = true;
  this.error = null;
  this.trip = null;

  this.api.searchTrip(this.form.value).subscribe({
    next: (res: TripResult) => {
      this.trip = res;
      this.loading = false;
    },
    error: (err) => {
      this.error = err?.error?.message || 'An error occurred';
      this.loading = false;
    }
  });
}

}
