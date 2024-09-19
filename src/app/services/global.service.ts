import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { IMovieResponse } from '../models/movie/movie.module';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  BASE_URL: string = "http://localhost:5079/api/v1/";

   public isErrorModalVisible: boolean = false;
   public currentErrorMessage: string  = '';
   public type = "Bien"
   public typeMethodPay: number = 0;


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

  selectPayment(idPaymentMethod: number) { this.typeMethodPay = idPaymentMethod}

  onConfirmPay () {

    if (this.typeMethodPay == 0){
       this.triggerModal("Error", true, "Elige un metodo de pago")
    }
    
  }
  
  
  
 
}
