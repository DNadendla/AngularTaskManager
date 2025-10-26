import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from './project';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl = 'http://localhost:8081/api'; // change if backend URL differs

  constructor(
    private httpClint: HttpClient,
    private loginService: LoginService
  ) {}

  getAllProjects(): Observable<Project[]> {
    return this.httpClint.get<Project[]>(`${this.baseUrl}/project`);
  }

  insertProject(project: Project): Observable<Project> {
    return this.httpClint.post<Project>(`${this.baseUrl}/project`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClint.put<Project>(`${this.baseUrl}/project`, project);
  }

  deleteProject(projectID: number): Observable<void> {
    return this.httpClint.delete<void>(`${this.baseUrl}/project/${projectID}`);
  }

  searchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClint.get<Project[]>(
      `${this.baseUrl}/projects/search/${searchBy}/${searchText}`
    );
  }
}
