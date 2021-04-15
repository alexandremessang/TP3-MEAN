import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CharacterService } from '../services/character.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Character } from '../shared/models/character.model';

@Component({
  selector: 'app-add-character-form',
  templateUrl: './add-character-form.component.html',
  styleUrls: ['./add-character-form.component.scss']
})

export class AddCharacterFormComponent implements OnInit {
  @Input() characters: Character[];

  addCharacterForm: FormGroup;
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);

  constructor(private characterService: CharacterService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addCharacterForm = this.formBuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age
    });
  }

  addCharacter(): void {
    this.characterService.addCharacter(this.addCharacterForm.value).subscribe(
      res => {
        this.characters.push(res);
        this.addCharacterForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
