import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { File } from '../shared/models/file.model';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-display-file',
  templateUrl: './display-file.component.html',
  styleUrls: ['./display-file.component.scss']
})
export class DisplayFileComponent implements OnInit {

  file = new File();
  isLoading = true;
  isEditing = false;

  constructor(private fileService: FileService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
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

    cancelViewing(): void {
      this.router.navigate(['/folders']);
    }
}
