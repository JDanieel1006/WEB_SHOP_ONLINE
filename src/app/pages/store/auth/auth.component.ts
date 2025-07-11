import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomersService } from '../../../services/Customers/Customers.service';
import { CustomerLoginSubmissionDto } from '../../../model/Customers/CustomerLoginSubmissionDto.model';

@Component({
  selector: 'app-auth',
  imports: [InputTextModule, PasswordModule, ButtonModule, FormsModule, CommonModule, IconFieldModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

    /**
     * Global variables
    */
    public username : string = '';
    public password : string = '';

    /**
     * Injection of services
    */
    private customersService = inject(CustomersService);


    constructor(private router: Router) {}

    public onLogin() {
        const request: CustomerLoginSubmissionDto ={
            email: this.username,
            password: this.password
        }
        this.customersService.Login(request).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/indexStore']);
            },
            error: (error) => {
                console.error('Login failed', error);
            }
        })
    }

    public goToRegister(){
        this.router.navigate(['/register']);
    }
}
