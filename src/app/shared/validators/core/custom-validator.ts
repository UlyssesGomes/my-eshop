import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export abstract class CustomValidator {
  /**
   * Method that describes the logic for custom validation.
   *
   * @param control - FormControl of his input
   * @return boolean - must return true if input contains a valid value, false otherwise
   */
  protected abstract isValid(control: AbstractControl): boolean;

  /**
   * Method that returns the pair key
   * value with name and error message
   * of validation. The name must be stored
   * on the key and the message to be displayed must
   * be stored in value.
   *
   * @return SystemPair - pair with name and validation message.
   */
  protected abstract errorValidator(): ValidationErrors;

  /**
   * Does validation in the method isValid() and return
   * a pair if your input has a validation error.
   *
   * @param control - FormControl of his input
   * @returns SystemPair - must return a SystemPair if input has an error
   */
  public validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isValid(control)) {
        return null;
      } else {
        return this.errorValidator();
      }
    };
  }
}