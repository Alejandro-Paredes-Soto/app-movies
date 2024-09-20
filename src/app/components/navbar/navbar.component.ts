import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
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

   constructor (private route: Router, private eRef: ElementRef){}

   onToggleSubMenu (){
    this.subMenu = !this.subMenu;
   }

   @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInsideMenu = this.eRef.nativeElement.contains(event.target);
    
    if (!clickedInsideMenu && this.subMenu) {
      this.subMenu = false;
    }
  }



  onLogout () {
    localStorage.clear()
    this.route.navigate(['/']);
  }
}
