import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

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
