import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl = 'http://localhost:9090/api'; // change if backend URL differs

  constructor(private httpClint: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.httpClint.get<Project[]>(`${this.baseUrl}/projects`);
  }

  insertProject(project: Project): Observable<Project> {
    return this.httpClint.post<Project>(`${this.baseUrl}/projects`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClint.put<Project>(`${this.baseUrl}/projects`, project);
  }

  deleteProject(projectID: number): Observable<void> {
    return this.httpClint.delete<void>(
      `${this.baseUrl}/projects?projectID=${projectID}`
    );
  }
}
