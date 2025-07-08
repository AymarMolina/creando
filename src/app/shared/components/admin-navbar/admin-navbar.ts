import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar {
  isDropdownOpen = false;
  constructor( private auth: AuthService) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.auth.cerrarSesion();
  }
}
