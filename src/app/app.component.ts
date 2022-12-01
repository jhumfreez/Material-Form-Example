import { Component, VERSION } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateAnimal } from './validators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  myForm = new FormGroup({
    animal: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
      // Custom validator
      validateAnimal(),
    ]),
  });
  get animal() {
    return this.myForm.get('animal');
  }
  get errorMessage() {
    if (this.animal.hasError('required')) {
      return 'You must enter a value';
    }
    return this.animal.errors ? 'Invalid input' : '';
  }

  submit() {
    this.myForm.markAllAsTouched();
  }

  clear() {
    this.myForm.reset({
      animal: '',
    });
  }
}
