import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../components/home/home.component';
import { RouterGuard } from '../guards/router-guards.guard';
import { SaleshistoryComponent } from '../components/saleshistory/saleshistory.component';
import { ProductbillingComponent } from '../components/productbilling/productbilling.component';
import { CreateSalesComponent } from '../components/create-sales/create-sales.component';
import { EmployeesComponent } from '../components/employees/employees.component';
import { ProductsComponent } from '../components/products/products.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { SheetsComponent } from '../components/sheets/sheets.component';

export const routes: Routes =
    [
        {
            path: '',
            component: AuthComponent
        },
        {
            path: 'home',
            component: HomeComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'saleshistory',
            component: SaleshistoryComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'productbilling',
            component: ProductbillingComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'createsales',
            component: CreateSalesComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'employees',
            component: EmployeesComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'products',
            component: ProductsComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'categories',
            component: CategoriesComponent,
            canActivate: [RouterGuard]
        },
        {
            path: 'sheets',
            component: SheetsComponent,
            canActivate: [RouterGuard]
        }

    ];
