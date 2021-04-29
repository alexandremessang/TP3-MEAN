import { Component, OnInit } from '@angular/core';

import { FileService } from '../services/file.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { File } from '../shared/models/file.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  file = new File();
  files: File[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private fileService: FileService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getfiles();
  }

  getfiles(): void {
    this.fileService.getFiles().subscribe(
      data => this.files = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(file: File): void {
    this.isEditing = true;
    this.file = file;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.file = new File();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the files to reset the editing
    this.getfiles();
  }

  editfile(file: File): void {
    this.fileService.editFile(file).subscribe(
      () => {
        this.isEditing = false;
        this.file = file;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletefile(file: File): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.fileService.deleteFile(file).subscribe(
        () => {
          this.files = this.files.filter(elem => elem._id !== file._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
