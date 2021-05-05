import { Component, OnInit } from '@angular/core';
import { Folder } from '../shared/models/folder.model';
import { FolderService } from '../services/folder.service';


@Component({
  selector: 'app-file-explorer-view',
  templateUrl: './file-explorer-view.component.html',
  styleUrls: ['./file-explorer-view.component.scss']
})
export class FileExplorerViewComponent implements OnInit {
  public fileElements: Folder[];

  constructor(public fileService: FolderService) {}

  currentRoot: Folder;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    this.fileService.getFolder("60926cd2d07a4db7d832af3c").subscribe(data => {
      this.fileElements = data.folders;
      this.currentRoot = data;
    });
  }

  addFolder(name: string) {
    var folder = {
      name: name,
      parent: this.currentRoot._id,
      isFolder: true,
      isPublic: false,
    }

    this.fileService.addFolder(folder).subscribe(data => console.log(data));
    // this.fileService.getFolder(this.currentRoot._id).subscribe(data => {
    //   this.fileElements = data.folders;
    // })
    this.updateFileElementQuery();
  }

  removeElement(element: Folder) {
    this.fileService.deleteFolder(element._id).subscribe();
    this.updateFileElementQuery();
  }

  navigateToFolder(element: Folder) {
    this.fileService.getFolder(element._id).subscribe(data => {
      this.fileElements = data.folders;
    })
    this.currentRoot = element;
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    this.fileService.getFolder(this.currentRoot.parent).subscribe(data =>  {
      this.currentRoot = data;
      this.fileElements = data.folders;
    });
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: Folder; moveTo: Folder }) {
    event.element.parent = event.moveTo._id;
    this.fileService.updateFolder(event.element);
    this.updateFileElementQuery();
  }

  renameElement(element: Folder) {
    this.fileService.updateFolder(element);
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileService.getFolder(this.currentRoot._id).subscribe(data =>  {
      this.fileElements = [];
      for(const folder of data.folders) {
        this.fileElements.push(folder);
      }
      for(const file of data.files) {
        this.fileElements.push(file);
      }
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
