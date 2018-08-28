import { FormControl, Validators } from '@angular/forms';
export class Logger{
    public email: string;
    public password: string;

    constructor(){}

public validationRules?() {
    return {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
  }
}
}