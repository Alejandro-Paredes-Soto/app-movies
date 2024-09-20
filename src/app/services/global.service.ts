import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { IMovieResponse } from '../models/movie/movie.module';
import { ICard } from '../models/card/card.module';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  BASE_URL: string = "http://localhost:5079/api/v1/";

   public isErrorModalVisible: boolean = false;
   public currentErrorMessage: string  = '';
   public type = "Bien"
   public typeMethodPay: number = 0;
   public listCar: {idMovie: string, imgMovie: string, titleMovie: string, descriptionMovie: string}[] = []
   public searchText: string = '';
   
  public methodPayCard: boolean = false;
  public methodPayTransference: boolean = false;



   constructor(private http: HttpClient) {

   }

   triggerModal( type: string, showModal: boolean, messageError: string): void {
    this.isErrorModalVisible = showModal;
    this.currentErrorMessage = messageError;
    this.type = type;
  }

  onModalClose(): void {
    this.isErrorModalVisible = false;
    
  }

  methodGet<T>(token: string, url: string, params?: string) {
    return this.http.get<T>(
      `${this.BASE_URL}${url}${params ? params : ''}`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        observe: 'response'
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error); 
        return of(error); 
      })
    );
  }

  methodPost<T>(token: string, url: string, body: Object, params?: string, ) {
    
     return this.http.post<T>(`${this.BASE_URL}${url}${params ? params : ''}`, body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      observe: 'response'
     }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error); 
        return of(error); 
      })
    );
  }

  
  
  
  
 
}
