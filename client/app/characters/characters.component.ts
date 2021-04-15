import { Component, OnInit } from '@angular/core';

import { CharacterService } from '../services/character.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Character } from '../shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  character = new Character();
  characters: Character[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private characterService: CharacterService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getcharacters();
  }

  getcharacters(): void {
    this.characterService.getCharacters().subscribe(
      data => this.characters = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(character: Character): void {
    this.isEditing = true;
    this.character = character;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.character = new Character();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the characters to reset the editing
    this.getcharacters();
  }

  editcharacter(character: Character): void {
    this.characterService.editCharacter(character).subscribe(
      () => {
        this.isEditing = false;
        this.character = character;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletecharacter(character: Character): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.characterService.deleteCharacter(character).subscribe(
        () => {
          this.characters = this.characters.filter(elem => elem._id !== character._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
