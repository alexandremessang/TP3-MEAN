import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Folder } from '../shared/models/folder.model';


@Injectable()
export class FolderService {

  constructor(private http: HttpClient) { }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>('/api/folders');
  }

  countFolders(): Observable<number> {
    return this.http.get<number>('/api/folders/count');
  }

  addRoot(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>('/api/folders', folder);
  }

  addFolder(id:string, element: any): Observable<Folder> {
    let _id = new HttpParams().set('id', id);
    return this.http.post<Folder>(`/api/folders`,element, {params: _id });
  }

  getFolder(id: string): Observable<Folder> {
    return this.http.get<Folder>(`/api/folders/${id}`);
  }

  updateFolder(folder: Folder): Observable<any> {
    return this.http.put(`/api/folders/${folder._id}`, folder, { responseType: 'text' });
  }

  deleteFolder(id:string): Observable<any> {
    return this.http.delete(`/api/folders/${id}`, { responseType: 'text' });
  }
  
}
