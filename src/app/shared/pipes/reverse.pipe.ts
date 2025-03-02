import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reverse',
  pure: true,
})
export class ReversePipe implements PipeTransform {
  transform(value: unknown, ...args: any[]) {
    if (!value) {
      return '';
    }

    return String(value).split('').reverse();
  }
}