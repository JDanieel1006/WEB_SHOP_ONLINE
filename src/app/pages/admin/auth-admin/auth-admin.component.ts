import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UserSubmissionDto } from '../../../model/User/UserSubmissionDto.model';
import { Router } from '@angular/router';
import { UserService } from '../../../services/User/User.service';

@Component({
  selector: 'app-auth-admin',
  imports: [InputTextModule, PasswordModule, ButtonModule, FormsModule, CommonModule, IconFieldModule],
  templateUrl: './auth-admin.component.html',
  styleUrl: './auth-admin.component.scss'
})
export class AuthAdminComponent {

    /**
         * Global variables
        */
        public username : string = '';
        public password : string = '';

        /**
         * Injection of services
        */
        private userService = inject(UserService);

        constructor(private router: Router) {}

        public onLogin() {
            const request: UserSubmissionDto ={
                email: this.username,
                password: this.password
            }
            this.userService.Login(request).subscribe({
                next: (response) => {

                    const token = localStorage.getItem('token_admin');
                    if (!token) {
                        return;
                    }
                    const payload = token.split('.')[1];
                    if (!payload) {
                        return;
                    }
                    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
                    const payloadObj = JSON.parse(decodedPayload);

                    const userId = payloadObj.nameid;

                    if (userId) {
                        localStorage.setItem('adminId', userId);
                    }
                    localStorage.setItem('token_admin', response.token);
                    this.router.navigate(['/dashboard/home']);
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
