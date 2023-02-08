import { Pipe, PipeTransform } from '@angular/core';
import { IContact } from '../Models/IContact';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText: string, propertyName: string): any[] {

    if (!value) {
      return [];
    }
    if (!searchText) {
      return value;
    }
    searchText = searchText.toLowerCase();
    return value.filter(it => {
      return it[propertyName].toLowerCase().includes(searchText);
    });

    // return filterText.length > 3 ? value.filter(x => x.name.toLowerCase().includes(filterText.toLowerCase())) : value
  }
}
