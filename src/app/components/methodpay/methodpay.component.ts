import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { GlobalService } from '../../services/global.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ISales } from '../../models/sales/sales.module';


@Component({
  selector: 'app-methodpay',
  standalone: true,
  imports: [ModalComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './methodpay.component.html',
  styleUrl: './methodpay.component.css'
})
export class MethodpayComponent {

  @Input() showModal: boolean = false; 
  @Input() idMovie: string = '';
  @Input() imgMovie: string = '';
  @Input() isCar: boolean = false;
  @Input() titleMovie: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public cardForm: FormGroup;

  public transferForm: FormGroup;

  public typeMethodPay: number = 0;
  public methodPayCard: boolean = false;
  public methodPayTransference: boolean = false;

   constructor (public SvcGlobal: GlobalService){
    this.cardForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required]),
      cardHolder: new FormControl('', [Validators.required]),
      expireDate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required])
    })

    this.transferForm = new FormGroup ({
      bankName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      accountOwner: new FormControl('', [Validators.required])
    })
   }

  closeModal () {
    this.showModal = false;
    this.close.emit();
  }


  selectPayment(idPaymentMethod: number) { 
    this.typeMethodPay = idPaymentMethod
    
    if (idPaymentMethod == 2 || idPaymentMethod == 3){
        this.methodPayCard = true;
        this.methodPayTransference = false;
    }

    if (idPaymentMethod == 4){
       this.methodPayCard = false;
       this.methodPayTransference = true;
    }  
    if (idPaymentMethod == 1){
      this.methodPayCard = false;
      this.methodPayTransference = false;
    }
  }

  onConfirmPay () {

    if (this.typeMethodPay == 0){
       this.SvcGlobal.triggerModal("Error", true, "Elige un metodo de pago")
       return;
    }


    if ((this.typeMethodPay == 2 || this.typeMethodPay == 3)){
        
      if (this.cardForm.valid) {
          this.fnPay(this.idMovie, this.typeMethodPay, this.imgMovie, this.isCar, this.titleMovie);
          this.cardForm.reset();

      } else {
        this.SvcGlobal.triggerModal("Error", true, "Rellena todos los campos")
      }
        
    }  else if (this.typeMethodPay == 4){
         if (this.transferForm.valid){
              this.fnPay(this.idMovie, this.typeMethodPay, this.imgMovie, this.isCar, this.titleMovie);
              this.transferForm.reset()
         } else {
          this.SvcGlobal.triggerModal("Error", true, "Rellena todos los campos")

         }
    } else if (this.typeMethodPay == 1){
  
        this.fnPay(this.idMovie, this.typeMethodPay, this.imgMovie, this.isCar, this.titleMovie);
  
    }

 
    
  }


  fnPay (idMovie: string, typeMethodPay: number, imgMovie: string, isCar: boolean, titleMovie: string){

    this.SvcGlobal.methodPost<ISales>(localStorage.getItem("token")!, "Sales", {
      idUser: localStorage.getItem("idUser"),
      idMovie: idMovie,
      idPaymentMethod: typeMethodPay,
      total: 100,
      poster_path: imgMovie,
      title: titleMovie
    }).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          // Es una respuesta exitosa
          if (response.status === 200) {
            this.SvcGlobal.triggerModal("Bien", true, "Compra exitosa")

            if (isCar) {
              const newData = JSON.parse(localStorage.getItem("car")!).filter((v:any) => v.idMovie != this.idMovie)
              localStorage.setItem("car", JSON.stringify(newData))
              this.SvcGlobal.listCar = newData;
            }

            setTimeout(() => {
               this.closeModal()
            }, 2000)
          } else {
            console.error('Error en el estado de la respuesta:', response.status);
          }
        } else if (response instanceof HttpErrorResponse) {
          // Es una respuesta de error
          this.SvcGlobal.triggerModal('Error', true, response.error)

          setTimeout(() => {
            this.closeModal()
         }, 2000)
        }
      },
      (error) => {
        console.error('Error en la suscripción:', error);
      }
    )
  }

  

}
