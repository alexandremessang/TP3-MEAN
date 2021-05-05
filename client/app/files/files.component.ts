import { Component, OnInit } from '@angular/core';

import { FileService } from '../services/file.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { File } from '../shared/models/file.model';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';


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
  isViewing = false;
  isCreating = false;

  constructor(private fileService: FileService,
              private auth: AuthService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getfiles();
    console.log("edit : " + this.isEditing)
    console.log("view : " + this.isViewing)
  }

  getfiles(): void {
    this.fileService.getMyFiles(this.auth.currentUser.username).subscribe(
      data => this.files = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableViewing(file: File): void {
    this.fileService.getFile(file._id).subscribe(
      () => {
        this.isViewing = true;
        this.isEditing = false;
        this.file = file;
      },
      error => console.log(error)
    );
  }

  enableCreating(file: File): void {
    this.isViewing = false;
    this.isEditing = false;
    this.isCreating = true;
    this.file = new File();
  }

  enableEditing(file: File): void {
    this.isEditing = true;
    this.isViewing = false;
    this.file = file;
  }

  cancelViewing(): void {
    this.isViewing = false;
    this.file = new File();
    this.getfiles();
  }

  cancelCreating(): void {
    this.isCreating = false;
    this.getfiles();
  }

  onCancelCreatingFile(e: boolean) {
    console.log(e);
    this.cancelCreating();
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
