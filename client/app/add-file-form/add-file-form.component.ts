import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileService } from '../services/file.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { File } from '../shared/models/file.model';

@Component({
  selector: 'app-add-file-form',
  templateUrl: './add-file-form.component.html',
  styleUrls: ['./add-file-form.component.scss']
})

export class AddFileFormComponent implements OnInit {
  @Input() files: File[];

  addFileForm: FormGroup;
  title = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  language = new FormControl('', Validators.required);
  isPublic = new FormControl(true || false, Validators.required);
  content = new FormControl('', Validators.required);

  constructor(private fileService: FileService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addFileForm = this.formBuilder.group({
      title: this.title,
      author: this.author,
      language: this.language,
      likes: 0,
      isPublic: false,
      content: this.content,
    });
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
