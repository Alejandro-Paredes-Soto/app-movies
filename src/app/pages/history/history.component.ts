import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MethodpayComponent } from '../../components/methodpay/methodpay.component';
import { ISales } from '../../models/sales/sales.module';
import { GlobalService } from '../../services/global.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, MethodpayComponent, FilterPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  public history: ISales[] = [];


  constructor (public SvcGlobal: GlobalService){}

  ngOnInit(): void {
    this.SvcGlobal.methodGet<ISales[]>(localStorage.getItem("token")!, `Sales/${localStorage.getItem("idUser")}`).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          // Es una respuesta exitosa
          if (response.status === 200) {
            this.history = response.body ? response.body : [];
           
          } else {
            console.error('Error en el estado de la respuesta:', response.status);
          }
        } else if (response instanceof HttpErrorResponse) {
          // Es una respuesta de error
          console.error('Error en la petición:', response.message);
          this.SvcGlobal.triggerModal("Error", true, "Ocurrio un error inesperado")
        }
      },
      (error) => {
        console.error('Error en la suscripción:', error);
      }
    )
  }

}
