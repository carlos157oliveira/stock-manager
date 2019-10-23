import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first, filter, takeWhile, take } from "rxjs/operators";
import { ItemService } from '../../data/item.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemNameAvailableValidatorService {

  constructor(private itemService: ItemService) {}

  checkItemNameNotAvailable(exceptions: string[]) {
    return (control: AbstractControl) => {
        return control.valueChanges
          .pipe(debounceTime(500))
          /*.pipe(takeWhile(itemName => {
            console.log(exceptions);
            console.log(itemName);
            elementsToBeTaken = 0;
            return !exceptions.some(value => itemName == value);
          }))*/
          .pipe(switchMap(itemName => {
            if(exceptions.some(value => itemName == value))
              return of(false);

            return this.itemService.checkItemNameNotAvailable(itemName)
          }))
          .pipe(map(notAvailable => notAvailable ? { itemNameNotAvailable: true } : null))
          .pipe(first());
    }
  }

  private checkForException(itemName: string, exceptions: string[]) {
    if(exceptions.some(value => itemName == value))
      return map(() => false);
    else
      return switchMap(() =>
        this.itemService.checkItemNameNotAvailable(itemName));
  }

}
