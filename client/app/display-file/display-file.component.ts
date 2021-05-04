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
  isLoading = false;

  constructor(private fileService: FileService,
    public toast: ToastComponent) { }

  ngOnInit(): void {
    // alimenter le file
    // file = this.fileService.getFile();
  }


}
