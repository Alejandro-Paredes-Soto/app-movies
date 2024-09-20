import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { ITvResponse, Tv } from '../../models/tv/tv.module';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CardComponent } from '../../components/card/card.component';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, CardComponent, FilterPipe],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css'
})
export class TvComponent implements OnInit{

    
     public imgTv: Tv[] = [];
   
    constructor (public SvcGlobal: GlobalService) {

    }
  ngOnInit(): void {
    this.SvcGlobal.methodGet<ITvResponse>(localStorage.getItem("token")!, "TV").subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          // Es una respuesta exitosa
          if (response.status === 200) {
            this.imgTv = response.body?.results || [];
          } else {
            console.error('Error en el estado de la respuesta:', response.status);
          }
        } else if (response instanceof HttpErrorResponse) {
          // Es una respuesta de error
          console.error('Error en la petición:', response.message);
        }
      },
      (error) => {
        console.error('Error en la suscripción:', error);
      }
    );
    
  }
}
