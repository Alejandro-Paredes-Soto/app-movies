import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  public registerForm: FormGroup;
  public isLoading = false;


   constructor (
       public httpSvc: HttpClient, 
       public SvcGlobal: GlobalService,
       private router: Router
      ) {

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
   }

  onSubmit() {
    try {
      if (this.registerForm.value.name != "" &&
        this.registerForm.value.last_name != "" &&
        this.registerForm.value.email != "" &&
        this.registerForm.value.password != "" &&
        this.registerForm.value.confirmPassword != "") 
       {

        if (this.registerForm.value.password == this.registerForm.value.confirmPassword) {
          this.isLoading = true;
            
          this.httpSvc.post('http://localhost:5079/api/v1/Users', this.registerForm.value)
            .subscribe({
              next: (response) => {
                this.isLoading = false;
                this.SvcGlobal.triggerModal("Bien", true, 'Usuario creado con éxito');

                setTimeout(() => {
                  this.router.navigate(["/"])
                }, 3000)
              },
              error: (error) => {
                console.error('Error', error.error);
                this.isLoading = false;
                this.SvcGlobal.triggerModal("Error",true, error.error);
              }
            });
        } else {
          this.SvcGlobal.triggerModal("Error",true, "Las contraseñas no coinciden");
        }
        
      } else {
        this.SvcGlobal.triggerModal("Error",true, 'Completa los campos');
      }
     } catch (error) {
        this.SvcGlobal.triggerModal("Errors",true, "Ocurrio un error inesperado")
     }
  }
}
