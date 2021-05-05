import { Component, OnInit } from '@angular/core';
import { Folder } from '../shared/models/folder.model';
import { FolderService } from '../services/folder.service';
import { File } from '../shared/models/file.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-file-explorer-view',
  templateUrl: './file-explorer-view.component.html',
  styleUrls: ['./file-explorer-view.component.scss']
})
export class FileExplorerViewComponent implements OnInit {
  public fileElements: Folder[];

  constructor(public folderService: FolderService, private jwtHelper: JwtHelperService,) {}

  currentRoot: Folder;
  currentPath: string;
  currentUser:any;
  rootId: string;
  canNavigateUp = false;


  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.currentUser = this.jwtHelper.decodeToken(token).user;
      this.rootId = this.currentUser.rootId;
    } else {
      this.rootId = "60926cd2d07a4db7d832af3c";
    }

    this.folderService.getFolder(this.rootId).subscribe(data => {
      this.processData(data);
      this.currentRoot = data;
    });
  }

  processData(data: Folder) {
    this.fileElements = [];
    for(const folder of data.folders) {
      this.fileElements.push(folder);
    }
    for(const file of data.files) {
      this.fileElements.push(file);
    }
  }

  addFolder(name: string) {
    var folder = {
      name: name,
      parent: this.currentRoot._id,
      isFolder: true,
      isPublic: false,
    }

    this.folderService.addFolder(this.currentRoot._id, folder).subscribe(data => console.log(data));
    // this.folderService.getFolder(this.currentRoot._id).subscribe(data => {
    //   this.fileElements = data.folders;
    // })
    this.updateFileElementQuery();
  }

  importFile(files: File[]) {
    for(const file of files) {
      this.folderService.addFolder(this.currentRoot._id, file).subscribe(data => console.log(data));
    }
    // this.folderService.getFolder(this.currentRoot._id).subscribe(data => {
    //   this.fileElements = data.folders;
    // })
    this.updateFileElementQuery();
  }

  removeElement(element: Folder) {
    this.folderService.deleteFolder(element._id).subscribe();
    this.updateFileElementQuery();
  }

  navigateToFolder(element: Folder) {
    this.folderService.getFolder(element._id).subscribe(data => {
      this.processData(data);
    })
    this.currentRoot = element;
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if(this.currentRoot && this.currentRoot.parent === "60926cd2d07a4db7d832af3c") {
      this.canNavigateUp = false;
    }
    this.folderService.getFolder(this.currentRoot.parent).subscribe(data =>  {
      this.currentRoot = data;
      this.processData(data);
    });
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: Folder; moveTo: Folder }) {
    event.element.parent = event.moveTo._id;
    this.folderService.updateFolder(event.element);
    this.updateFileElementQuery();
  }

  renameElement(element: Folder) {
    this.folderService.updateFolder(element);
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.folderService.getFolder(this.currentRoot._id).subscribe(data =>  {
      this.processData(data);
    });
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

}
