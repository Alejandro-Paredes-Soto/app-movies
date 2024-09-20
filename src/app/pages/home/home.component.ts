import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { IMovieResponse, Movie } from '../../models/movie/movie.module';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CardComponent, CommonModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  public imgMovies: Movie[] = [];

   constructor (public SvcGlobal: GlobalService) {

    this.SvcGlobal.methodGet<IMovieResponse>(localStorage.getItem("token")!, "Movies").subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          // Es una respuesta exitosa
          if (response.status === 200) {
            this.imgMovies = response.body?.results || []; 
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
