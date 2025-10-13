import { Injectable } from '@angular/core';

/* Global used service 
@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class DashboardService {
  TeamMembersSummary: any = [];

  getTeamMemberTeamMemberSummary() {
    return [
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
  }
}
