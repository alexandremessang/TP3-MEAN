import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { File } from '../shared/models/file.model';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>('/api/files');
  }

  getMyFiles(author: string): Observable<File[]> {
    let auth = new HttpParams().set('author', author);
    return this.http.get<File[]>('/api/files/me', { params: auth });
  }

  getPublicFiles(language?: string): Observable<File[]> {
    let lang = new HttpParams().set('language', language);
    return this.http.get<File[]>('/api/files/public', { params: lang });
  }

  countFiles(): Observable<number> {
    return this.http.get<number>('/api/files/count');
  }

  addFile(file: File): Observable<File> {
    return this.http.post<File>('/api/files', file);
  }

  getFile(id: string): Observable<File> {
    return this.http.get<File>(`/api/files/${id}`);
  }

  // getFileById(id: string): Observable<File> {
  //   return this.http.get<File>(`/api/files/${id}`);
  // }

  editFile(file: File): Observable<any> {
    return this.http.put(`/api/files/${file._id}`, file, { responseType: 'text' });
  }

  deleteFile(file: File): Observable<any> {
    return this.http.delete(`/api/files/${file._id}`, { responseType: 'text' });
  }

}
