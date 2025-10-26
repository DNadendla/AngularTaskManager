// import { Component, OnInit } from '@angular/core';
// import { ProjectsService } from '../../projects.service';
// import { Project } from '../../project';
// import { Modal } from 'bootstrap';

// @Component({
//   selector: 'app-projects',
//   standalone: false,
//   templateUrl: './projects.component.html',
//   styleUrl: './projects.component.scss',
// })
// export class ProjectsComponent implements OnInit {
//   projects: Project[];
//   project: Project = new Project();
//   editProject: Project = new Project();
//   editIndex: any = null;
//   deleteProject: Project = new Project();
//   deleteIndex: any = null;

//   constructor(private projectService: ProjectsService) {}

//   ngOnInit(): void {
//     this.projectService.getAllProjects().subscribe((data: Project[]) => {
//       this.projects = data;
//       console.log(this.projects);
//     });
//   }

//   // helper to close a bootstrap modal by id (reuse across methods)
//   private closeModal(modalId: string) {
//     const el = document.getElementById(modalId);
//     if (!el) return;
//     const instance = Modal.getInstance(el) ?? new Modal(el);
//     instance.hide();
//     instance.dispose();
//   }

//   saveProject() {
//     this.projectService
//       .insertProject(this.project)
//       .subscribe((data: Project) => {
//         console.log(data);
//         this.projects.push(data);
//         this.resetForm();
//       });
//     this.closeModal('projectModal');
//   }

//   onEditProject(index: number) {
//     this.editProject.projectID = this.projects[index].projectID;
//     this.editProject.projectName = this.projects[index].projectName;
//     this.editProject.dateOfStart = this.projects[index].dateOfStart;
//     this.editProject.teamSize = this.projects[index].teamSize;
//     this.editIndex = index;
//   }

//   onUpdateProject() {
//     this.projectService
//       .updateProject(this.editProject)
//       .subscribe((data: Project) => {
//         var project = new Project();
//         project.projectID = data.projectID;
//         project.projectName = data.projectName;
//         project.dateOfStart = data.dateOfStart;
//         project.teamSize = data.teamSize;
//         this.projects[this.editIndex] = project;
//         this.editIndex = null;
//         // this.resetForm();
//       });
//   }

//   onDeleteProject(event: any, index: number) {
//     this.deleteIndex = index;
//     this.deleteProject.projectID = this.projects[index].projectID;
//     this.deleteProject.projectName = this.projects[index].projectName;
//     this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
//     this.deleteProject.teamSize = this.projects[index].teamSize;
//   }

//   onDeleteConfirm() {
//     this.projectService
//       .deleteProject(this.deleteProject.projectID)
//       .subscribe((res) => {
//         this.projects.splice(this.deleteIndex, 1);
//         this.deleteIndex = null;
//         this.deleteProject = new Project();
//       });
//   }

//   resetForm() {
//     this.project = new Project();
//   }
// }

// New Impl
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Project } from '../../project';
import { Modal } from 'bootstrap';
import { ClientLocationService } from '../../client-location.service';
import { ClientLocation } from '../../client-location';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  // ------------------- ViewChild references -------------------
  @ViewChild('addProjectModal') addModalRef!: ElementRef;
  @ViewChild('editProjectModal') editModalRef!: ElementRef;
  @ViewChild('deleteProjectModal') deleteModalRef!: ElementRef;
  @ViewChild('projectForm') projectForm!: NgForm;

  /* @ViewChild('myModal') modalRef!: ElementRef;
  private modalInstance!: Modal; */

  // ------------------- Modal instances -------------------
  addModal!: Modal;
  editModal!: Modal;
  deleteModal!: Modal;

  // ------------------- Project data -------------------
  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];
  project: Project = new Project();
  editProject: Project = new Project();
  editIndex: number | null = null;
  deleteProject: Project = new Project();
  deleteIndex: number | null = null;
  searchBy: string = '';
  searchText: string = '';
  showLoader: boolean = true;
  projectStatuses: string[] = [
    'Maintenance',
    'In Progress',
    'Completed',
    'Paused',
  ];

  constructor(
    private projectService: ProjectsService,
    private clientLocationService: ClientLocationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadClientLocations();
    this.showLoader = false;
  }

  /*   openModal() {
    this.modalInstance.show(); // opens the modal
  }

  closeModal() {
    this.modalInstance.hide(); // closes the modal
  } */

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is ready
    this.addModal = new Modal(this.addModalRef.nativeElement);
    this.editModal = new Modal(this.editModalRef.nativeElement);
    this.deleteModal = new Modal(this.deleteModalRef.nativeElement);
    // this.modalInstance = new Modal(this.modalRef.nativeElement);
  }

  // ------------------- Load ClientLocations -------------------
  loadClientLocations() {
    this.clientLocationService
      .getClientLocations()
      .subscribe((data: ClientLocation[]) => {
        this.clientLocations = data;
      });
  }

  // ------------------- Load Projects -------------------
  loadProjects() {
    this.projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  // ------------------- Add Project -------------------
  openAddModal() {
    this.project = new Project();
    if (this.projectForm) {
      this.projectForm.resetForm({
        clientLocation: '',
        status: '', // dropdown default
        teamSize: null,
        name: '',
        dateOfStart: '',
      });
    }
    this.addModal.show();
  }

  saveProject(form: NgForm): void {
    debugger;
    if (form.valid) {
      this.projectService
        .insertProject(this.project)
        .subscribe((data: Project) => {
          this.projects.push(data);
          this.project = new Project();
          this.addModal.hide(); // safely hide modal
          form.resetForm();
        });
    } else {
      form.control.markAllAsTouched(); // highlight all invalid fields
    }
  }

  // ------------------- Edit Project -------------------
  openEditModal(index: number) {
    this.editProject = { ...this.projects[index] }; // copy data
    this.editIndex = index;
    this.editModal.show();
  }

  updateProject(form: NgForm): void {
    if (this.editIndex === null) return;
    debugger;
    if (form.valid) {
      this.projectService
        .updateProject(this.editProject)
        .subscribe((data: Project) => {
          this.projects[this.editIndex!] = { ...data };
          this.editIndex = null;
          this.editModal.hide(); // safely hide modal
        });
    } else {
      form.control.markAllAsTouched(); // highlight all invalid fields
    }
  }

  // ------------------- Delete Project -------------------
  openDeleteModal(index: number) {
    this.deleteProject = { ...this.projects[index] };
    this.deleteIndex = index;
    this.deleteModal.show();
  }

  deleteProjectConfirm() {
    if (this.deleteIndex === null) return;
    this.projectService.deleteProject(this.deleteProject.id).subscribe(() => {
      this.projects.splice(this.deleteIndex!, 1);
      this.deleteIndex = null;
      this.deleteProject = new Project();
      this.deleteModal.hide(); // safely hide modal
    });
  }

  // ------------------- Search Project -------------------
  onSearchProjects() {
    this.projectService
      .searchProjects(this.searchBy, this.searchText)
      .subscribe((data: Project[]) => {
        this.projects = data;
      });
  }
}
