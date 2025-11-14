import { AbstractControl, ValidationErrors } from "@angular/forms";
import { CustomValidator } from "../core/custom-validator";

export class CpfValidator extends CustomValidator {
    protected isValid(control: AbstractControl): boolean {
        let cpf = control.value;

        if (!cpf) 
            return false;

        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) 
            return false;

        let sum = 0;
        let remainder;

        // Primeiro dígito
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf[9])) 
            return false;

        // Segundo dígito
        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf[10])) 
            return false;

        // CPF válido
        return true;
    }

    protected errorValidator(): ValidationErrors {
        return {
            cpfDomain: 'CPF informado é inválido.',
        };
    }
}
