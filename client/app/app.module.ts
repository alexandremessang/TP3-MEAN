// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
// Services
import { CatService } from './services/cat.service';
import { CharacterService } from './services/character.service';
import { FileService } from './services/file.service';
import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AddCatFormComponent } from './add-cat-form/add-cat-form.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CharactersComponent } from './characters/characters.component';
import { AddCharacterFormComponent } from './add-character-form/add-character-form.component';
import { FilesComponent } from './files/files.component';
import { AddFileFormComponent } from './add-file-form/add-file-form.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { DisplayFileComponent } from './display-file/display-file.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AddCatFormComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    CharactersComponent,
    AddCharacterFormComponent,
    FilesComponent,
    AddFileFormComponent,
    MoviesComponent,
    AddMovieFormComponent,
      DashboardComponent,
      DisplayFileComponent
   ],
  imports: [
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('token'),
        // allowedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    HighlightModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    CharacterService,
    FileService,
    MovieService,
    UserService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
