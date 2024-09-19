import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { protectedGuard } from './auth/guards/protected.guard';
import { protectedLoginGuard } from './auth/guards/protected-login.guard';
import { DetailsComponent } from './pages/details/details.component';
import { TvComponent } from './pages/tv/tv.component';
import { HistoryComponent } from './pages/history/history.component';
import { ListCarComponent } from './pages/list-car/list-car.component';

export const routes: Routes = [
    { 
        path: '',
        component: LoginComponent,
        canActivate: [protectedLoginGuard]
      },
      {
        path: 'Register',
        component: RegisterComponent,
        canActivate: [protectedLoginGuard]
      },
      {
        path: 'Home',
        component: HomeComponent,
        canActivate: [protectedGuard],
      
      },
      {
        path: 'Details/:idMovie',
        component: DetailsComponent,
        canActivate: [protectedGuard]
      },
      {
        path: 'Tv',
        component: TvComponent,
        canActivate: [protectedGuard]
      },
      {
        path: 'History',
        component: HistoryComponent,
        canActivate: [protectedGuard]
      },
      {
        path: 'ListCar',
        component: ListCarComponent,
        canActivate: [protectedGuard]
      }
      
];
