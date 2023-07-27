import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateJalaliPipe'
})
export class DateJalaliPipePipe implements PipeTransform {

  transform(value: string): string {
    const splittedDate:string[] = value.slice().split("-");
    return new Date(
      Number(splittedDate[0]),
      Number(splittedDate[1]),
      Number(splittedDate[2]))
    .toLocaleDateString('fa-Ir')
    // .slice(2);
  }

}
