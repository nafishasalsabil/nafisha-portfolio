import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CentralService} from '../../shared/central-service/central.service';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {Divider} from 'primeng/divider';
import {Image} from 'primeng/image';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-project-detail',
  imports: [
    Breadcrumb,
    Divider,
    Image,
    Button
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  projectId: any | undefined;
  project: any = null;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private route: ActivatedRoute, private service: CentralService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== this.projectId) {
        this.projectId = id;
        this.loadProjectData(id);
      }
    });

    this.home = {label: "Nafisha", routerLink: '/', icon: 'none'};
  }

  loadProjectData(id: any) {
    this.service.getProjects().subscribe({
      next: (data: any) => {
        this.project = data.find(p => p.id == id);
        this.items = [
          {
            label: 'Projects',
            command: () => {
              this.router.navigate(['/'], {fragment: 'projects'});
            },
            styleClass: 'cursor-pointer hover:text-primary hover:underline'
          },
          {label: this.project.label},
        ];
      }
    })
  }

  goToLiveUrl(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
