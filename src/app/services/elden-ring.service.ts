import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EldenRingService {
  private baseUrl = 'https://eldenring.fanapis.com/api';

  constructor(private http: HttpClient) {}

  getWeapons(limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/weapons?limit=${limit}`);
  }

  getBosses(limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/bosses?limit=${limit}`);
  }

  getWeaponById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weapons/${id}`);
  }
}
