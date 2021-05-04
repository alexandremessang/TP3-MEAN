import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { File } from '../shared/models/file.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  file = new File;
  files: File[] = [];
  isLoading = true;
  isViewing = false;

  constructor(private fileService: FileService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getfiles();
  }

  getfiles(): void {
    this.fileService.getPublicFiles().subscribe(
      data => {
        this.files = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableViewing(file: File): void {
    this.fileService.getFile(file).subscribe(
      () => {
        this.isViewing = true;
        this.file = file;
      },
      error => console.log(error)
    );
  }

  cancelViewing(): void {
    this.isViewing = false;
    this.file = new File();
    this.getfiles();
  }

  filterByLanguage(selectedLine): void{
    this.fileService.getPublicFiles(selectedLine).subscribe(
      data => {
        this.files = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
