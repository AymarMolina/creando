import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
    contrasena = '';

    constructor(private auth: AuthService, private router: Router) {}

    login() {
      this.auth.login({ email: this.email, contrasena: this.contrasena }).subscribe({
        next: (res: any) => {
          this.auth.guardarSesion(res.token, res.user);
          const rol = res.user.rol;

          if (rol === 'admin') this.router.navigate(['/admin/productos']);
          else this.router.navigate(['/inicio']);
        },
        error: () => alert('Credenciales inválidas')
      });
    }
}
