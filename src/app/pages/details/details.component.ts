import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DetailsMovieComponent } from '../../components/details-movie/details-movie.component';
import { GlobalService } from '../../services/global.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Movie } from '../../models/movie/movie.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, DetailsMovieComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  public imgMovie: string = '';
  public titleMovie: string = '';
  public descriptionMovie: string = '';
 
  public idMovie: string = '';

  constructor (private SvcGlobal: GlobalService, private route: ActivatedRoute){}

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => this.idMovie = params.get('idMovie') || '')
    
     this.SvcGlobal.methodGet<Movie>(localStorage.getItem("token")!, `Movies/Details/${this.idMovie}`).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          
          if (response.status === 200) {
        
              this.imgMovie = response.body?.poster_path || '';
              this.titleMovie = response.body?.title || '';
              this.descriptionMovie = response.body?.overview || '';
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
