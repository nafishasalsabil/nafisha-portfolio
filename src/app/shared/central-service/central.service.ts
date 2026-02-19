import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

export interface Project {
  id: number;
  img: string;
  label: string;
  category: string;
  description: string;
  technologies: string[];
  live: string;
  slug: string;
  addedAt: string;
  spotlight?: boolean;
  tagline?: string;
  highlights?: string[];
  challenges?: string[];
  role?: string;
  status?: string;
  github?: string;
  screenshots?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CentralService {
  private projectsCache$: Observable<Project[]> | null = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all projects, sorted by addedAt DESC (newest first)
   * Results are cached using shareReplay to avoid repeated HTTP calls
   */
  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<Project[]>('assets/projects.json').pipe(
        map(projects => this.sortProjectsByDate(projects)),
        shareReplay(1)
      );
    }
    return this.projectsCache$;
  }

  /**
   * Sort projects by addedAt DESC (newest first)
   * Projects without addedAt are placed at the end
   */
  private sortProjectsByDate(projects: Project[]): Project[] {
    return [...projects].sort((a, b) => {
      const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
      const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
      return dateB - dateA; // DESC order
    });
  }

  /**
   * Get a single project by slug or id
   */
  getProjectByIdentifier(identifier: string | number): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(projects => 
        projects.find(p => p.slug === identifier || p.id == identifier)
      )
    );
  }
}
