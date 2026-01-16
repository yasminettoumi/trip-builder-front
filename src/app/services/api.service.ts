import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://trip-builder-1.onrender.com/api';

  constructor(private http: HttpClient) {}

  getAirports() {
    return this.http.get<any[]>(`${this.baseUrl}/airports`);
  }

  searchTrip(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/trips/search`, payload);
  }

  getTrip(id: number) {
    return this.http.get<any>(`${this.baseUrl}/trips/${id}`);
  }
}
