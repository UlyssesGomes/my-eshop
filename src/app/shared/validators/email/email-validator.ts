import { AbstractControl, ValidationErrors } from "@angular/forms";
import { CustomValidator } from "../core/custom-validator";

export class EmailValidator extends CustomValidator {
  private regex;

  constructor(regex: any) {
    super();
    this.regex = regex;
  }

  protected isValid(control: AbstractControl): boolean {
    if (this.regex.test(control.value)) {
      return true;
    }

    return false;
  }

  protected errorValidator(): ValidationErrors {
    return {
      emailDomain: 'Esse email não possui um domínio válido.',
    };
  }
}