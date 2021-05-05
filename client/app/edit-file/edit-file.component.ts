import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { File } from '../shared/models/file.model';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {

  file = new File();
  isLoading = true;

  constructor(private fileService: FileService,
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private router: Router) { }

  ngOnInit(): void {
    this.getFile(this.route.snapshot.paramMap.get('id'));
  }

  getFile(id:any): void {
    this.fileService.getFile(id)
    .subscribe(
      data => this.file = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  cancelEditing(): void {
    this.router.navigate(['/files']);
  }

  editfile(file: File): void {
    this.fileService.editFile(file).subscribe(
      () => {
        this.file = file;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}
