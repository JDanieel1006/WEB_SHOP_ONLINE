import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomersService } from '../../../services/Customers/Customers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'register',
  imports: [InputTextModule, PasswordModule, ButtonModule, FormsModule, CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    /**
     * Global variables
    */
    public registerForm: FormGroup;
    public submitted = false;

    /**
     * Injection of services
    */
    private customersService = inject(CustomersService);
    private messageService = inject(MessageService);

    constructor(private fb: FormBuilder, private router: Router) {
        this.registerForm = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        address: ['', Validators.required]
        });
    }

    get name() { return this.registerForm.get('name')!; }
    get lastName() { return this.registerForm.get('lastName')!; }
    get email() { return this.registerForm.get('email')!; }
    get password() { return this.registerForm.get('password')!; }
    get address() { return this.registerForm.get('address')!; }

    public onRegister() {
        this.submitted = true;
        if (this.registerForm.invalid) return;

        const request = this.registerForm.value;

        this.customersService.Create(request).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Registro exitoso`,
                    detail: `Bienvenido ${response.name}, tu cuenta ha sido creada exitosamente.`,
                });
                this.registerForm.reset();
                this.submitted = false;

                setTimeout(() => {
                    this.router.navigate(['/index']);
                }, 1000);
            },
            error: (error) => {
                console.error('Error registering customer:', error);
            }
        });
    }

    public goToLogin(){
        this.router.navigate(['/index']);
    }
}
