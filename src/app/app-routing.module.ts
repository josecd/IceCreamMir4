import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DonationListComponent } from './pages/donations/donation-list/donation-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ObjectListsComponent } from './pages/objects/object-lists/object-lists.component';
import { PetitionListComponent } from './pages/petitions/petition-list/petition-list.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';

const routes: Routes = [

  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent,canActivate: [AuthGuard] },
  { path: 'donations', component: DonationListComponent,canActivate: [AuthGuard] },
  { path: 'petitions', component: PetitionListComponent,canActivate: [AuthGuard] },
  { path: 'objects', component: ObjectListsComponent,canActivate: [AuthGuard] },


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
