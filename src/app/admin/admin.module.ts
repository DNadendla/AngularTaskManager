import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad/dashborad.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboradComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,

    // ParentComponent,
    // ChildComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DashboradComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
  ],
  providers: [DashboardService],
})
export class AdminModule {}
