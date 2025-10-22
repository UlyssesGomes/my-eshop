import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidator } from './custom-validator';

export abstract class CustomValidatorDirective implements Validator {
  /**
   * Method that returns a CustomValidator that
   * contains a implementation of his validation
   * on isValidate() method.
   *
   * @return CustomValidator - an implemented CustomValidation.
   */
  protected abstract doValidation(): CustomValidator;

  /**
   * Does validation and return a pair if your input
   * has a validation error.
   *
   * @param control
   * @returns SystemPair - must return a SystemPair if input has an error
   */
  public validate(control: AbstractControl): ValidationErrors | null {
    return this.doValidation().validate()(control);
  }
}
