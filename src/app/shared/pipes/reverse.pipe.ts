import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reverse',
  pure: true,
})
export class ReversePipe implements PipeTransform {
  transform(value: unknown) {
    if (!value) {
      return '';
    }

    return String(value).split('').reverse();
  }
}