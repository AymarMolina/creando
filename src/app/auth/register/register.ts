import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  nombre = '';
  email = '';
  contrasena = '';
  telefono = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    this.auth.register({
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
      rol: 'cliente',
      telefono: this.telefono
    }).subscribe({
      next: (res: any) => {
        this.auth.guardarSesion(res.token, res.user);
        this.router.navigate(['/inicio']);
      },
      error: () => alert('Error al registrar')
    });
  }
}
