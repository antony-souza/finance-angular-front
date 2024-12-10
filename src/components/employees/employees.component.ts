import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { LayoutOptionsComponent } from '../layout-options/layout-options.component';

interface IEmployeeResponse {
  id: string;
  name: string;
  email: string;
  image_url: string;
  store: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, LayoutOptionsComponent, ...MATERIAL_COMPONENTS],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  constructor(private readonly httpClient: HttpClient) { }

  employees: IEmployeeResponse[] = []

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(){
    this.httpClient.get<IEmployeeResponse[]>(`${environment.host}:${environment.port}/${environment.getAllUsers}/${localStorage.getItem('store_id')}`)
      .subscribe(response => {
        this.employees = response;
      });
  }

}
