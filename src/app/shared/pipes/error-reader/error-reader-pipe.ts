import { Pipe, PipeTransform } from '@angular/core';

type ValueItem = {
  [key: string]: string;
};

type Values = ValueItem[] | ValueItem;

@Pipe({
  name: 'errorReader'
})
export class ErrorReaderPipe implements PipeTransform {

  transform(values: any, ...args: unknown[]): unknown {
    let firstError = '';

    const findError = (item: ValueItem) => {
      for (const error in item) {
        if (!firstError) {
          firstError = error;
          return true;
        }
      }
      return false;
    };

    if (Array.isArray(values)) {
      values.forEach(findError);
    } else {
      findError(values);
    }

    const formatError = (firstError: string, values: Values): string => {
      if (error[firstError]) {
        return error[firstError];
      } else if (typeof (values as ValueItem)[firstError] === 'string') {
        return `${(values as ValueItem)[firstError]}`;
      }
      return `${firstError.charAt(0).toUpperCase() + firstError.slice(1)}`;
    };

    const error: { [index: string]: any } = {
      required: 'Campo obrigatório.',
      minlength: `Mínimo de ${values[firstError]?.requiredLength} caracteres.`,
      maxlength: `Máximo de ${values[firstError]?.requiredLength} caracteres.`,
      min: `Valor mínimo de ${values[firstError]?.min} é necessário.`,
      max: `Valor máximo de ${values[firstError]?.max} atingido.`,
    };

    return formatError(firstError, values);
  }

}
