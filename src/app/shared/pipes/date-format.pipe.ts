import {Pipe, PipeTransform} from '@angular/core'
import moment from 'moment'

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value?: string, ...args: string[]): string {
    if (!value) {
      return ''
    }
    if (args.length < 2) {
      return moment(value).format(args[0])
    }
    return moment(value, args[0]).format(args[1])
  }
}
