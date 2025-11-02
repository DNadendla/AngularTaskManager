import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboradComponent } from './admin/dashborad/dashborad.component';
import { AboutComponent } from './admin/about/about.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [CanActivateGuardService],
    data: { expectedRoles: ['ADMIN', 'USER'] },
  },
  {
    path: 'dashboard',
    component: DashboradComponent,
    canActivate: [CanActivateGuardService],
    data: { expectedRoles: ['ADMIN', 'USER'] },
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [CanActivateGuardService],
    data: { expectedRoles: ['ADMIN', 'USER'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
