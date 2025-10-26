import { ClientLocation } from './client-location';

export class Project {
  /* projectID!: number;
  projectName!: string;
  dateOfStart!: string;
  teamSize!: number;

  constructor() {
    this.projectID = 0;
    this.projectName = '';
    this.dateOfStart = '';
    this.teamSize = 0;
  } */
  id: number;
  name: string;
  dateOfStart: string; // ISO date string, e.g. "2025-10-26"
  teamSize: number;
  active: boolean;
  status: string;
  // clientLocationId: number;
  clientLocation: ClientLocation;

  constructor() {
    this.id = 0;
    this.name = '';
    this.dateOfStart = '';
    this.teamSize = 0;
    this.active = false;
    this.status = '';
    this.clientLocation = new ClientLocation();
  }
}
