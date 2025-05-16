import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoverService {
  readonly apiKey: string = 'uv8sHuCXqwSY5lKNlDDqDjC3kqFRyqk9RDz1sYe8';
  readonly baseURL: string = 'https://api.nasa.gov/mars-photos/api/v1/';

  constructor(private httpClient: HttpClient) { }

  // GET: devuelve el manifiesto del rover seleccionado
  getRoverManifest(roverName: string): Observable<any> {
    const url = `${this.baseURL}manifests/${roverName}?api_key=${this.apiKey}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  // GET: devuelve  imágenes de un rover de la NASA según su nombre, el día marciano (sol) y el número de página
  getRoverImages(roverName: string, sol: number, page: number): Observable<any> {
    const url = `${this.baseURL}rovers/${roverName}/photos?sol=${sol}&page=${page}&api_key=${this.apiKey}`;
    console.log(url);
    return this.httpClient.get(url);
  }
}