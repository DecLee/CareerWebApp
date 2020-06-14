import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Career } from './career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private careerUrl = 'http://localhost:5000/career';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(this.careerUrl).pipe(
      tap(_ => console.log('get all careers'))
    );
  }

  postCareer(careerInfo:Career): Observable<Career> {
    return this.http.post<Career>(this.careerUrl, careerInfo, this.httpOptions)
      .pipe(
        tap(_ => console.log(careerInfo))
      );
  }

  
}
