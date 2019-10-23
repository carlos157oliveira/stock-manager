import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export abstract class FormComponent {

  form: FormGroup
  editMode: boolean

  constructor(activatedRoute: ActivatedRoute) {
    this.editMode = activatedRoute.snapshot.data.editMode;
  }

  showFeedbackMsg(fieldName: string, validation: string) {
    if(this.form.get(fieldName).errors)
      return this.form.get(fieldName).errors[validation];

    return false;
  }

  anyError(fieldName: string) {
    return !!this.form.get(fieldName).errors;
  }

  controlClass(fieldName: string) {
    return {
      'is-success': !this.anyError(fieldName),
      'is-danger': this.anyError(fieldName)
    };
  }

  abstract addObject();

  abstract editObject();

  submit() {
    if(this.editMode)
      this.editObject();
    else
      this.addObject();
  }

}
