import { Component, OnInit } from '@angular/core';

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

  constructor() {}

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

    this.TeamMembersSummary = [
      {
        Region: 'East',
        TeamMembersCount: 20,
        TemparorilyUnavailableMembers: 2,
      },
      {
        Region: 'West',
        TeamMembersCount: 21,
        TemparorilyUnavailableMembers: 12,
      },
      {
        Region: 'North',
        TeamMembersCount: 22,
        TemparorilyUnavailableMembers: 13,
      },
      {
        Region: 'South',
        TeamMembersCount: 23,
        TemparorilyUnavailableMembers: 14,
      },
    ];

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
}
