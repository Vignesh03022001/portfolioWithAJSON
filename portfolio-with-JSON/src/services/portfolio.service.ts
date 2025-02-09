import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolioData: any = null;
  private dataUrl = '/portfolio.json'; // Path to JSON, customizable

  constructor(private http: HttpClient) { }

  getPortfolioItems(): Observable<any> {
    if (this.portfolioData) {
      return of(this.portfolioData); // Return cached data
    }

    return this.http.get<any>(this.dataUrl).pipe(
      tap(data => this.portfolioData = data), 
      catchError(this.handleError('getPortfolioItems', []))
    );
  }

    private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T); 
    };
  }
}
