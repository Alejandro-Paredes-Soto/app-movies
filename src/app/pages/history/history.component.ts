import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MethodpayComponent } from '../../components/methodpay/methodpay.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, MethodpayComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

}
