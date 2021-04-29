import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { File } from '../shared/models/file.model';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>('/api/files');
  }

  countFiles(): Observable<number> {
    return this.http.get<number>('/api/files/count');
  }

  addFile(file: File): Observable<File> {
    return this.http.post<File>('/api/files', file);
  }

  getFile(file: File): Observable<File> {
    return this.http.get<File>(`/api/files/${file._id}`);
  }

  editFile(file: File): Observable<any> {
    return this.http.put(`/api/files/${file._id}`, file, { responseType: 'text' });
  }

  deleteFile(file: File): Observable<any> {
    return this.http.delete(`/api/files/${file._id}`, { responseType: 'text' });
  }

}
