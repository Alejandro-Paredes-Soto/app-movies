import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ModalComponent } from '../modal/modal.component';
import { MethodpayComponent } from '../methodpay/methodpay.component';

@Component({
  selector: 'app-details-movie',
  standalone: true,
  imports: [ModalComponent, CommonModule, MethodpayComponent],
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css'
})
export class DetailsMovieComponent {
   
    @Input() idMovie: string = '';
    @Input() imgMovie: string = '';
    @Input() titleMovie: string = '';
    @Input() descriptionMovie: string = '';

    public showModal: boolean = false;


    constructor (public SvcGlobal: GlobalService){}


    onAddCar (idMovie: string) {
      const newItem = {
        idMovie: idMovie,
        imgMovie: this.imgMovie,
        titleMovie: this.titleMovie,
        descriptionMovie: this.descriptionMovie
      };
      
      const storedItems = localStorage.getItem('car');
      
      let carItems: { idMovie: string; imgMovie: string; titleMovie: string; descriptionMovie: string }[] = [];
      
      if (storedItems) {
        carItems = JSON.parse(storedItems);
      }
       
       let searchItem = carItems.find((value) => value.idMovie == newItem.idMovie);
       if (searchItem){
             this.SvcGlobal.triggerModal("Error", true, `Ya existe una pelicula ${this.titleMovie} en tu carrito de compras`)
            return;
        } else {

          carItems.push(newItem);
          localStorage.setItem('car', JSON.stringify(carItems));
          this.SvcGlobal.triggerModal("Bien", true, `La pelicula ${this.titleMovie} se agrego a tu carrito de compras`)
        }
      
      
    }

    onPay(idMovie: string) {
      this.showModal = true;
    }

    closeModal(){
      this.showModal = false;
    }
}
