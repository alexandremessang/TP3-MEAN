import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { File } from '../shared/models/file.model';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-display-file',
  template: `
    <ngx-prism
      [language] = "file.language"
    >{{file.content}}</ngx-prism>`,
  styleUrls: ['./display-file.component.scss']
})
export class DisplayFileComponent implements OnInit {

  file = new File();
  files: File[] = [];
  isLoading = false;

  constructor(private fileService: FileService,
    public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles().subscribe(
      data => this.files = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteFile(file: File): void {
    if (window.confirm('Êtes-vous sûr ?')) {
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
