import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { DialogPutEmployeesComponent } from './dialog-put-employees/dialog-put-employees.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostEmployeesComponent } from './dialog-post-employees/dialog-post-employees.component';

interface IEmployeeResponse {
  id: string;
  name: string;
  email: string;
  image_url: string;
  store: string;
  role: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent,...MATERIAL_COMPONENTS],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
 
  constructor(private readonly httpClient: HttpClient, private dialog: MatDialog) { }

  employees: IEmployeeResponse[] = []
  
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(){
    this.httpClient.get<IEmployeeResponse[]>(`${environment.apiProd}/${environment.getAllUsers}/${localStorage.getItem('store_id')}`)
      .subscribe(response => {
        this.employees = response;
      });
  }

  openEditDialog(employeeId: string): void {
    const dialogRef = this.dialog.open(DialogPutEmployeesComponent, {
      width: '400px',
      data: { user_id: employeeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogPostEmployeesComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteUser(employeeId: string) {
    if (!confirm('Tem certeza que deseja deletar este usuário? Essa ação não poderá ser desfeita!')) {
      return;
    }
    this.httpClient.delete(`${environment.apiProd}/${environment.deletePermanUser}/${employeeId}`)
      .subscribe(() => {
        this.loadEmployees();
      });
  }
}
