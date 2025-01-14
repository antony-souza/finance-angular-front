import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { environment } from '../../../environment/environment';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPutCategoriesComponent } from './dialog-put-categories/dialog-put-categories.component';
import { DialogPostCategoriesComponent } from './dialog-post-categories/dialog-post-categories.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GenericSearchService } from '../../utils/genericSearch/generic-search.service';

interface ICategoriesResponse {
  id: string;
  name: string;
  image_url: string;
  store_name: string;
  storeName: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent, ...MATERIAL_COMPONENTS, HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  constructor(
    private readonly httpClient: HttpClient, 
    private readonly genericSearchService: GenericSearchService,
    private dialog: MatDialog) { }

  categories: ICategoriesResponse[] = []

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.httpClient.get<ICategoriesResponse[]>(`${environment.apiProd}/${environment.getAllCategoriesByStoreId}/${localStorage.getItem('store_id')}`)
      .subscribe(response => {
        this.categories = response;
      });
  }

  searchCategories(search: string) {
    if(!search.trim()){
      return
    }

    this.genericSearchService.genericBaseSearch<ICategoriesResponse[]>(environment.searchCategoriesFromStoreByName, search)
    .subscribe(response =>{
      this.categories = response;
    })
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
    if (!confirm('Tem certeza que deseja deletar está categoria? Essa ação não poderá ser desfeita!')) {
      return;
    }
    this.httpClient.delete(`${environment.apiProd}/${environment.deleteCategories}/${category_id}`)
      .subscribe(() => {
        this.loadCategories();
      });
  }
}
