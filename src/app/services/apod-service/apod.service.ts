import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApodService {
  readonly apiKey: string = 'uv8sHuCXqwSY5lKNlDDqDjC3kqFRyqk9RDz1sYe8';
  readonly baseURL: string = 'https://api.nasa.gov/planetary/apod';

  constructor(private httpClient: HttpClient) { }

  // Obtiene la imagen astronómica del día (APOD) actual desde la API NASA
  getAPOD(): Observable<any> {
    const url = `${this.baseURL}?api_key=${this.apiKey}&thumbs=true`;
    return this.httpClient.get<any>(url);
  }

  // Obtiene una imagen APOD aleatoria (count=1) desde la API NASA
  getRandomAPOD(): Observable<any> {
    const url = `${this.baseURL}?api_key=${this.apiKey}&count=1&thumbs=true`;
    return this.httpClient.get<any>(url);
  }
}
