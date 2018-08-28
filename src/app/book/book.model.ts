import { FormControl, Validators } from '@angular/forms';

export class Book {

public title: string;
public description: string;
public imagePath: string;

constructor(){}

public validationRules?() {
    return {
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imagePath: new FormControl('', [Validators.required])
  }

}

}