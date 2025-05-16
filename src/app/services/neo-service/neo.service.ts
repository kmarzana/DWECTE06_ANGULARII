import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Neo } from '../../models/neo.model';

@Injectable({
  providedIn: 'root'
})
export class NeoService {
  readonly jsonPATH = "assets/datos/neo-db.json";

  constructor(private httpClient: HttpClient) { }

  getNeoData(): Observable<any> {
    return this.httpClient.get<any>(this.jsonPATH);
  }

  deleteNeo(): Observable<void> {
    return of(undefined).pipe(delay(500));
  }

  updateNeo(id: string, updateData: Partial<Neo>): Observable<Partial<Neo>> {
    return of(updateData).pipe(delay(500));
  }
}
