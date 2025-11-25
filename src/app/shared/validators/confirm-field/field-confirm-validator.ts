import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

import { CustomValidator } from "../core/custom-validator";

export class FieldConfirmValidator extends CustomValidator {
    fieldMirrorName = '';

    constructor(fieldName: string) {
        super();
        this.fieldMirrorName = fieldName;
    }

    protected override isValid(control: AbstractControl): boolean {
        const controlMirror = control.parent?.get(this.fieldMirrorName);
        if (controlMirror && controlMirror.value === control.value) {
            if (!controlMirror.valid)
                controlMirror.updateValueAndValidity();
            return true;
        }

        return false;
    }

    protected override errorValidator(): ValidationErrors {
        return {
            fieldDifferentValue: 'Campo possui valor diferente do campo de confirmação.'
        }
    }
}
