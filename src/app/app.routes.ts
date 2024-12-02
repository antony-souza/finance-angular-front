import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../components/home/home.component';
import { RouterGuard } from '../guards/router-guards.guard';
import { ChartBaseComponent } from '../components/charts/charts.component';

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
            path: 'charts',
            component: ChartBaseComponent,
            canActivate: [RouterGuard]
        }

    ];
