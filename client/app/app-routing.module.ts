// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { CatsComponent } from './cats/cats.component';
import { CharactersComponent } from './characters/characters.component';
import { FilesComponent } from './files/files.component';
import { MoviesComponent } from './movies/movies.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayFileComponent } from './display-file/display-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
// import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileExplorerViewComponent } from './file-explorer-view/file-explorer-view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'files', component: FilesComponent },
  { path: 'folders', component: FileExplorerViewComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'display-file/:id', component: DisplayFileComponent },
  { path: 'edit-file/:id', component: EditFileComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
