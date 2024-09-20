import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { GlobalService } from '../../services/global.service';
import { ILogin } from '../../models/login/login.module';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isLoading = false;


  constructor(
     private httpSvc: HttpClient, 
     public SvcGlobal: GlobalService,
     private router:Router
    ) {
   
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  
  }

 
  onSubmit(): void {
     try {
      if (this.loginForm.value.email != "" && this.loginForm.value.password != "") {
        this.isLoading = true;
        this.httpSvc.post<ILogin>('http://localhost:5079/api/v1/Users/login', this.loginForm.value)
          .subscribe({
            next: (response) => {

              
              this.isLoading = false;
              localStorage.setItem("token", response.token);
              localStorage.setItem("idUser", response.idUser)
              this.router.navigate(['/Home']);

            },
            error: (error) => {
              console.error('Error', error);
              this.isLoading = false;
              this.SvcGlobal.triggerModal("Error",true,'Correo electrónico y/o contraseña incorrectos.');
            }
          });
      } else {
        this.SvcGlobal.triggerModal("Error",true, 'Completa los campos');
      }
     } catch (error) {
        this.SvcGlobal.triggerModal("Error",true, "Ocurrio un error inesperado")
     }
  }
}
