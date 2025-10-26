import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from './client-location';

@Injectable({
  providedIn: 'root',
})
export class ClientLocationService {
  private baseUrl = 'http://localhost:8081/api'; // change if backend URL differs

  constructor(private httpClient: HttpClient) {}

  getClientLocations(): Observable<ClientLocation[]> {
    return this.httpClient.get<ClientLocation[]>(
      `${this.baseUrl}/clientLocation`
    );
  }
}
