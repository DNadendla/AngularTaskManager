import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboradComponent } from './admin/dashborad/dashborad.component';
import { AboutComponent } from './admin/about/about.component';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './admin/projects/projects.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboradComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
