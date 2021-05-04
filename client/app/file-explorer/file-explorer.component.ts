import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Folder } from '../shared/models/folder.model'
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger} from '@angular/material/menu'; 
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component'
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component'
@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent {

  constructor(public dialog: MatDialog) {}

  @Input() fileElements: Folder[]
  @Input() canNavigateUp: string
  @Input() path: string

  @Output() folderAdded = new EventEmitter<{ name: string }>()
  @Output() elementRemoved = new EventEmitter<Folder>()
  @Output() elementRenamed = new EventEmitter<Folder>()
  @Output() elementMoved = new EventEmitter<{
    element: Folder
    moveTo: Folder
  }>()
  @Output() navigatedDown = new EventEmitter<Folder>()
  @Output() navigatedUp = new EventEmitter()

  deleteElement(element: Folder) {
    this.elementRemoved.emit(element);
  }

  navigate(element: Folder) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: Folder, moveTo: Folder) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: Folder) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, element: Folder, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}