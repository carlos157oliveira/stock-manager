import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../data/category.service';
import { CategoryAvailableValidatorService } from './category-available.validator.service';
import { FormComponent } from 'src/app/shared/components/standards/form-component';
import { InvalidEntryError } from '../../core/errors/invalid-entry-error';

@Component({
  templateUrl: './item-category-add.component.html'
})
export class ItemCategoryAddComponent extends FormComponent implements OnInit {


  form: FormGroup;
  exceptions: string[] = [];
  currentId: number;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(CategoryAvailableValidatorService) private categoryAvailableValidator: CategoryAvailableValidatorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(activatedRoute);
  }

  ngOnInit() {
    this.currentId = parseInt(this.activatedRoute.snapshot.params.id);

    if(this.editMode) {
      this.categoryService.getCategory(this.currentId).subscribe(category => {
        if(this.editMode && !category) {
          throw new InvalidEntryError();
        }
        this.exceptions.push(category.name);
        delete category['id'];
        this.form.setValue(category);
      });
    }

    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.required,
        this.categoryAvailableValidator.checkCategoryNotAvailable(this.exceptions)
      ],
      description: ['']
    });
  }

  editObject() {
      let category = this.form.value;
      category.id = this.currentId;
      this.categoryService.updateCategory(category)
        .subscribe(() => {
          new Notification('Categoria atualizada com sucesso.');
          this.router.navigate(['categorias']);
        });
  }

  addObject() {
    this.categoryService.saveCategory(this.form.value)
      .subscribe(() => {
        this.form.reset();
        new Notification('Categoria adicionada com sucesso.');
      });
  }

  delete() {
    this.categoryService.deleteCategory(this.currentId).subscribe(() => {
      new Notification('Categoria deletada com sucesso.');
      this.router.navigate(['categorias']);
    });
  }

}
