import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad/dashborad.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectNameValidatorDirective } from './project-name-validator.directive';

@NgModule({
  declarations: [
    DashboradComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectNameValidatorDirective,

    // ParentComponent,
    // ChildComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    DashboradComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
  ],
  providers: [DashboardService],
})
export class AdminModule {}
