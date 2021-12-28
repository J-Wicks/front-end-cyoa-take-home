import { Pipe, PipeTransform } from '@angular/core';
import { UserComment } from '../model/user-comment';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string, order: string): any[] {
    // If input is not an array, return as is
    if (!Array.isArray(array)) {
      return array;
    }

    // When "desc" is passed, reverse the sort order
    let modifier: number = 1;
    if (order.toLowerCase() === "desc") {
      modifier = -1;
    }

    array.sort(this.getSortFunc(field, modifier));
    return array;
  }

  getSortFunc(field:any, modifier:any){
    return  (a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1 * modifier;
      } else if (a[field] > b[field]) {
        return 1 * modifier;
      } else {
        return 0;
      }
    }
  }


}
