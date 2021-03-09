import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'documents',
        component: DocumentsComponent,
      },
      {
        path: 'document/:id',
        component: DocumentDetailsComponent,
      },
    ],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '***', redirectTo: '/documents' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
