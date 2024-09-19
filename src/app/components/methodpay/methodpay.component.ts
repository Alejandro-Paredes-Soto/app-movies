import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-methodpay',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './methodpay.component.html',
  styleUrl: './methodpay.component.css'
})
export class MethodpayComponent {

  @Input() showModal: boolean = false; 

  @Output() close: EventEmitter<void> = new EventEmitter<void>();


   constructor (public SvcGlobal: GlobalService){}

  closeModal () {
    this.showModal = false;
    this.SvcGlobal.typeMethodPay = 0
//    this.typeMethodPay = 0;
    this.close.emit();
  }

  

}
