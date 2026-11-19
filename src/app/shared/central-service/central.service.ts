import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export type BackendType = 'built' | 'integrated' | 'firebase' | 'none';

export interface ProjectLiveLink {
  label: string;
  url: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  img: string;
  label: string;
  category: string;
  description: string;
  technologies: string[];
  live: string;
  /** Optional multi-demo links; when present, replaces the single Live Demo button. */
  liveLinks?: ProjectLiveLink[];
  slug: string;
  addedAt: string;
  /**
   * Optional card/browse rank. Lower = higher priority (1 first).
   * Projects without it sort after explicitly ordered ones.
   */
  displayOrder?: number;
  spotlight?: boolean;
  tagline?: string;
  highlights?: ProjectHighlight[];
  challenges?: string[];
  role?: string;
  status?: string;
  github?: string;
  screenshots?: string[];
  /** When true, project is omitted from listings and detail navigation. */
  hidden?: boolean;
  // Backend proof fields
  backendType?: BackendType;
  backendStack?: string;
  database?: string;
  language?: string[];
  oopProof?: string[];
}

/** Shared project ordering: displayOrder ASC → addedAt DESC → id DESC. */
export function compareProjects(a: Project, b: Project): number {
  const orderA = a.displayOrder ?? Number.POSITIVE_INFINITY;
  const orderB = b.displayOrder ?? Number.POSITIVE_INFINITY;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
  const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
  if (dateA !== dateB) {
    return dateB - dateA;
  }

  return b.id - a.id;
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(compareProjects);
}

@Injectable({
  providedIn: 'root'
})
export class CentralService {
  private projectsCache$: Observable<Project[]> | null = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all visible projects, sorted by displayOrder / addedAt / id.
   * Results are cached using shareReplay to avoid repeated HTTP calls.
   */
  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<Project[]>('assets/projects.json').pipe(
        map((projects) => sortProjects(projects.filter((p) => !p.hidden))),
        catchError((err) => {
          this.projectsCache$ = null;
          return throwError(() => err);
        }),
        shareReplay(1)
      );
    }
    return this.projectsCache$;
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
