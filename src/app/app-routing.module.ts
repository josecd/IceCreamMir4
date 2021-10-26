import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  // { path: 'crear-evento/:id', component: CrearEventoComponent ,canActivate: [AuthGuard]},
  
  //Mis rutas
  // {path: 'materias', component: MateriasComponent,canActivate: [AuthGuard]},
  // {path: 'materias/:id', component: MateriasComponent,canActivate: [AuthGuard]},

  // {path: 'perfil', component: PerfilComponent,canActivate: [AuthGuard]},
  // {path: 'inicio', component: HomeComponent,canActivate: [AuthGuard]},
  // {path: 'tareas', component: TareasComponent,canActivate: [AuthGuard]},
  // {path: 'tareas/:id', component: TareasComponent,canActivate: [AuthGuard]},

  // {path: 'horario', component: HorarioComponent,canActivate: [AuthGuard]},
  // {path: 'horario/:id', component: HorarioComponent,canActivate: [AuthGuard]},

  // {path: 'chat', component: ChatComponent,canActivate: [AuthGuard]},
  // {path: 'llamada', component: LlamadaComponent,canActivate: [AuthGuard]},
  // {path: 'llamada/:id', component: LlamadaComponent,canActivate: [AuthGuard]},

  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
