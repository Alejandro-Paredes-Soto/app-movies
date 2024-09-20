import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  public subMenu: boolean = false;

   constructor (private route: Router){}

   onToggleSubMenu (){
    this.subMenu = !this.subMenu;
   }

  onLogout () {
    localStorage.clear()
    this.route.navigate(['/']);
  }
}
