import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showDate'
})
export class ShowDatePipe implements PipeTransform {

  transform(value: unknown, showTime: boolean = false): unknown {
    if (value instanceof Date) {

      let options: any;
      if (showTime) {
        options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }
      }
      else {
        options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      }

      const formatada = value.toLocaleString('pt-BR', options);

      return formatada;
    }
    return value;
  }
}
