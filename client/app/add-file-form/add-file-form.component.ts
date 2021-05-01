import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileService } from '../services/file.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { File } from '../shared/models/file.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-file-form',
  templateUrl: './add-file-form.component.html',
  styleUrls: ['./add-file-form.component.scss']
})

export class AddFileFormComponent implements OnInit {
  @Input() files: File[];
  @Input() isCreating: boolean;

  @Output() cancelCreatingEvent = new EventEmitter();

  file = new File();

  isChecked = false;

  addFileForm: FormGroup;
  title = new FormControl('', Validators.required);
  language = new FormControl('', Validators.required);
  isPublic = new FormControl('', Validators.nullValidator);
  content = new FormControl('', Validators.required);

  constructor(private fileService: FileService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.file.isPublic)
    this.addFileForm = this.formBuilder.group({
      title: this.title,
      author: this.auth.currentUser.username,
      language: this.language,
      likes: 0,
      isPublic: this.isChecked,
      content: this.content,
    });
  }

  getfiles(): void {
    this.fileService.getFiles().subscribe(
      data => this.files = data,
      error => console.log(error),
    );
  }

  cancelCreating(): void {
    this.cancelCreatingEvent.emit(this.isCreating);
  }

  addFile(): void {
    this.fileService.addFile(this.addFileForm.value).subscribe(
      res => {
        console.log(res);
        this.files.push(res);
        this.addFileForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}
