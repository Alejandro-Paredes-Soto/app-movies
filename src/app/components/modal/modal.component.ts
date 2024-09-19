import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() showModal: boolean = false; 
  @Input() message: string = '';  
  @Input() type: string = '';

  
  
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public currentRoute: string = ''


  constructor (public route: Router){
    this.currentRoute = this.route.url
  }



  closeModal () {
    this.showModal = false;
    this.close.emit();
  }

}
