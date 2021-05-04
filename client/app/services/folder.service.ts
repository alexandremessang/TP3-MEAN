import { Injectable } from '@angular/core'

import { v4 } from 'uuid'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Folder } from '../shared/models/folder.model'

export interface IFileService {
  add(folder: Folder)
  delete(id: string)
  update(id: string, update: Partial<Folder>)
  queryInFolder(folderId: string): Observable<Folder[]>
  get(id: string): Folder
}

@Injectable()
export class FolderService implements IFileService {
  private map = new Map<string, Folder>()

  constructor() {}

  add(fileElement: Folder) {
    fileElement._id = v4()
    this.map.set(fileElement._id, this.clone(fileElement))
    return fileElement
  }

  delete(id: string) {
    this.map.delete(id)
  }

  update(id: string, update: Partial<Folder>) {
    let element = this.map.get(id)
    element = Object.assign(element, update)
    this.map.set(element._id, element)
  }

  private querySubject: BehaviorSubject<Folder[]>
  queryInFolder(folderId: string) {
    const result: Folder[] = []
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element))
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }

  get(id: string) {
    return this.map.get(id)
  }

  clone(element: Folder) {
    return JSON.parse(JSON.stringify(element))
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { Folder } from '../shared/models/folder.model';

// @Injectable()
// export class FolderService {

//   constructor(private http: HttpClient) { }

//   getFolders(): Observable<Folder[]> {
//     return this.http.get<Folder[]>('/api/folders');
//   }

//   countFolders(): Observable<number> {
//     return this.http.get<number>('/api/folders/count');
//   }

//   addRoot(folder: Folder): Observable<Folder> {
//     return this.http.post<Folder>('/api/folders', folder);
//   }

//   addFolder(id: string, folder: Folder): Observable<Folder> {
//     return this.http.post<Folder>(`/api/folders/${id}`, folder);
//   }

//   getFolder(folder: Folder): Observable<Folder> {
//     return this.http.get<Folder>(`/api/folders/${folder._id}`);
//   }

//   editFolder(folder: Folder): Observable<any> {
//     return this.http.put(`/api/folders/${folder._id}`, folder, { responseType: 'text' });
//   }

//   deleteFolder(folder: Folder): Observable<any> {
//     return this.http.delete(`/api/folders/${folder._id}`, { responseType: 'text' });
//   }

// }
