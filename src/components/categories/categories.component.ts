import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { environment } from '../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPutCategoriesComponent } from './dialog-put-categories/dialog-put-categories.component';
import { DialogPostCategoriesComponent } from './dialog-post-categories/dialog-post-categories.component';
import { HttpApiService } from '../../utils/http/http.service';

interface ICategoriesResponse {
  id: string;
  name: string;
  image_url: string;
  store_name: string;
  store_id: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent,...MATERIAL_COMPONENTS],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
 
  constructor(private readonly httpClient: HttpApiService, private dialog: MatDialog) { }

  categories: ICategoriesResponse[] = []
  
  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    const endpoint = `${environment.getAllCategoriesByStoreId}/${localStorage.getItem('store_id')}`;
    this.httpClient.genericRequest<ICategoriesResponse[]>(endpoint,'GET', true)
      .subscribe((response) => {
        this.categories = response;
      });
  }

  openEditDialog(category_id: string): void {
    const dialogRef = this.dialog.open(DialogPutCategoriesComponent, {
      width: '400px',
      data: { category_id: category_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogPostCategoriesComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  deleteCategories(category_id: string) {
    const endpoint = `${environment.deleteCategories}/${category_id}`;
    if (!confirm('Tem certeza que deseja deletar está categoria? Essa ação não poderá ser desfeita!')) {
      return;
    }
    this.httpClient.genericRequest<ICategoriesResponse>(endpoint, 'DELETE', false)
  }
}
