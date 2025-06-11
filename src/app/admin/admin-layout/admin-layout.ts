import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebar } from '../../shared/components/admin-sidebar/admin-sidebar';
import { AdminNavbar } from '../../shared/components/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule,AdminSidebar,AdminNavbar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
