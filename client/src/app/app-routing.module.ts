import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { VentaComponent } from 'src/app/components/venta/venta.component';
const routes: Routes = [
  {
    path : "",
    redirectTo : "/home/inicio",
    pathMatch : "full"
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path : "inicio",
        component : InicioComponent
      },
      {
        path : "ventas",
        component : VentaComponent
      }
    ]
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "navigation",
    component : NavigationComponent
  },
  {
    path : "footer",
    component : FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
