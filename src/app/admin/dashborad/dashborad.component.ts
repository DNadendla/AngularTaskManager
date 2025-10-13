import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashborad',
  standalone: false,
  templateUrl: './dashborad.component.html',
  styleUrl: './dashborad.component.scss',
})
export class DashboradComponent implements OnInit {
  Designation: string;
  Username: string;
  NoOfTeamMembers: number;
  TotalCostOfAllProjects: number;
  PendingTasks: number;
  UpcomingTasks: number;
  ProjectCost: number;
  CurrentExpenditure: number;
  AvailableFunds: number;
  Clients: string[];
  Projects: string[];
  Years: number[] = [];
  TeamMembersSummary: any = [];
  TeamMembers: any = [];

  constructor(private dashboardSevice: DashboardService) {}

  ngOnInit() {
    this.Designation = 'Team Leader';
    this.Username = 'Sai Ram';
    this.NoOfTeamMembers = 55;
    this.TotalCostOfAllProjects = 100;
    this.PendingTasks = 10;
    this.UpcomingTasks = 5;
    this.ProjectCost = 500;
    this.CurrentExpenditure = 200;
    this.AvailableFunds = 600;
    this.Clients = ['ABC Pvt Ltd', 'XYZ Pvt Ltd', 'LMN Pvt Ltd', 'PQR Pvt Ltd'];
    this.Projects = ['Project A', 'Project B', 'Project C', 'Project D'];

    for (let year = 2015; year <= 2024; year++) {
      this.Years.push(year);
    }

    this.TeamMembersSummary =
      this.dashboardSevice.getTeamMemberTeamMemberSummary();

    this.TeamMembers = [
      {
        Region: 'East',
        Members: [
          { ID: 1, Name: 'Sai Ram', Status: 'Available' },
          { ID: 2, Name: 'Sai Mahesh', Status: 'Available' },
          { ID: 3, Name: 'Veer', Status: 'Busy' },
          { ID: 4, Name: 'Mahi', Status: 'Busy' },
        ],
      },

      {
        Region: 'West',
        Members: [
          { ID: 5, Name: 'Ravi', Status: 'Available' },
          { ID: 6, Name: 'Raju', Status: 'Available' },
          { ID: 7, Name: 'Rajesh', Status: 'Busy' },
          { ID: 8, Name: 'Ramesh', Status: 'Busy' },
        ],
      },
      {
        Region: 'North',
        Members: [
          { ID: 9, Name: 'John', Status: 'Available' },
          { ID: 10, Name: 'David', Status: 'Available' },
          { ID: 11, Name: 'Smith', Status: 'Busy' },
          { ID: 12, Name: 'Peter', Status: 'Busy' },
        ],
      },
      {
        Region: 'South',
        Members: [
          { ID: 13, Name: 'Kumar', Status: 'Available' },
          { ID: 14, Name: 'Arjun', Status: 'Available' },
          { ID: 15, Name: 'Vijay', Status: 'Busy' },
          { ID: 16, Name: 'Ajay', Status: 'Busy' },
        ],
      },
    ];
  }

  onProjectChange(event: any) {
    const selectedProject = event.target.value;
    console.log(selectedProject);
    switch (selectedProject) {
      case 'Project A':
        this.ProjectCost = 500;
        this.CurrentExpenditure = 200;
        this.AvailableFunds = 300;
        break;
      case 'Project B':
        this.ProjectCost = 600;
        this.CurrentExpenditure = 250;
        this.AvailableFunds = 350;
        break;
      case 'Project C':
        this.ProjectCost = 700;
        this.CurrentExpenditure = 300;
        this.AvailableFunds = 400;
        break;
      case 'Project D':
        this.ProjectCost = 800;
        this.CurrentExpenditure = 350;
        this.AvailableFunds = 450;
        break;
      default:
        this.ProjectCost = 0;
        this.CurrentExpenditure = 0;
        this.AvailableFunds = 0;
        break;
    }
  }
}
