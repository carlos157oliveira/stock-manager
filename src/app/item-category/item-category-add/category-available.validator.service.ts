import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first } from "rxjs/operators";

import { CategoryService } from 'src/app/data/category.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryAvailableValidatorService {

  constructor(private categoryService: CategoryService) {}

  checkCategoryNotAvailable(exceptions: string[]) {
    return (control: AbstractControl) => {
        return control.valueChanges
          .pipe(debounceTime(500))
          .pipe(switchMap(categoryName => {
            if(exceptions.some(value => categoryName == value))
              return of(false);

            return this.categoryService.checkCategoryNotAvailable(categoryName);
          }))
          .pipe(map(notAvailable => notAvailable ? { categoryNotAvailable: true } : null))
          .pipe(first());
    }
  }
}
