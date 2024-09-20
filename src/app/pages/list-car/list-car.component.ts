import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { GlobalService } from '../../services/global.service';
import { MethodpayComponent } from '../../components/methodpay/methodpay.component';

@Component({
  selector: 'app-list-car',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, ModalComponent, MethodpayComponent],
  templateUrl: './list-car.component.html',
  styleUrl: './list-car.component.css'
})
export class ListCarComponent  implements OnInit{

   
   public showModal: boolean = false;
   public idMovie: string = '';
   public imgMovie: string = '';
   public isCar: boolean = true;
   public titleMovie: string = '';

   public showModal2: boolean = false;

    constructor (public SvcGlobal: GlobalService){}  

   ngOnInit(): void {

     let getListCar = localStorage.getItem("car")

      if (getListCar){
          
          this.SvcGlobal.listCar = JSON.parse(getListCar)
      }
     
   }

   onRemoveMovie (imgMovie: string){
    this.showModal = true

    let findIdMovie = this.SvcGlobal.listCar.find((v) => v.imgMovie == imgMovie);

    if (findIdMovie){

      this.idMovie = findIdMovie.idMovie;
    }
      
   }

   closeModal (){
    this.showModal = false
   }

   closeModal2 (){
    this.showModal2 = false;
   }

   onPayMovie (movie: any) {
    this.idMovie = movie.idMovie;
    this.imgMovie = movie.imgMovie;
    this.titleMovie = movie.titleMovie;

    this.showModal2 = true;

    }

   onConfirm (): void {
     
       const newData = this.SvcGlobal.listCar.filter((v) => v.idMovie !== this.idMovie);
       localStorage.setItem("car", JSON.stringify(newData))
       this.SvcGlobal.listCar = newData
       this.showModal = false
   }
}
