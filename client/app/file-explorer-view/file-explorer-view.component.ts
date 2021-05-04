import { Component, OnInit } from '@angular/core';
import { Folder } from '../shared/models/folder.model';
import { Observable } from 'rxjs';
import { FolderService } from '../services/folder.service';

@Component({
  selector: 'app-file-explorer-view',
  templateUrl: './file-explorer-view.component.html',
  styleUrls: ['./file-explorer-view.component.scss']
})
export class FileExplorerViewComponent implements OnInit {
  fileElements: Observable<Folder[]>;
  currentRoot: Folder;
  currentPath: string;
  canNavigateUp = false;
  constructor(private folderService:FolderService) { }

  ngOnInit(): void {
  }

  addFolder(folder: { name: string }) {
    this.folderService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot._id : 'root' });
    this.updateFileElementQuery();
  }
  
  removeElement(element: Folder) {
    this.folderService.delete(element._id);
    this.updateFileElementQuery();
  }
  
  moveElement(event: { element: Folder; moveTo: Folder }) {
    this.folderService.update(event.element._id, { parent: event.moveTo._id });
    this.updateFileElementQuery();
  }
  
  renameElement(element: Folder) {
    this.folderService.update(element._id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.folderService.queryInFolder(this.currentRoot ? this.currentRoot._id : 'root');
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.folderService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }
  
  navigateToFolder(element: Folder) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
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
