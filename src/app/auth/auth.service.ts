import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://apicreandoideas-zlxe.onrender.com/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; contrasena: string }) {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  guardarSesion(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  obtenerRol(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).rol : null;
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
