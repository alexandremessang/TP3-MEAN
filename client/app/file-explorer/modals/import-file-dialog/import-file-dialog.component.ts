import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileService } from 'client/app/services/file.service';
import { File } from 'client/app/shared/models/file.model';

@Component({
  selector: 'app-import-file-dialog',
  templateUrl: './import-file-dialog.component.html',
  styleUrls: ['./import-file-dialog.component.scss']
})
export class ImportFileDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ImportFileDialogComponent>, public fileService: FileService) {}

  myFiles: File[];
  publicFiles: File[];
  folderName:string;
  selectedFiles: File[];

  ngOnInit() {
    this.fileService.getFiles().subscribe(data=> {
      this.myFiles = data;
    });

    this.fileService.getPublicFiles().subscribe(data=> {
      this.publicFiles = data;
    });
  }

  onNgModelChange(e:any) {
    console.log(this.selectedFiles);
  }
}