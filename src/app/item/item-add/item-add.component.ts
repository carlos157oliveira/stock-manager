import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ItemService } from 'src/app/data/item.service';
import { CategoryService } from 'src/app/data/category.service';
import { FormComponent } from 'src/app/shared/components/standards/form-component';
import { Item } from 'src/app/data/item';
import { ItemNameAvailableValidatorService } from './item-name-available.validator.service';
import { InvalidEntryError } from 'src/app/core/errors/invalid-entry-error';

@Component({
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent extends FormComponent implements OnInit {

  currentId: number;
  currentQuantity: number;
  currentDate: Date;
  exceptions: string[] = [];

  categories$;


  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private itemNameValidator: ItemNameAvailableValidatorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(activatedRoute);
  }


  ngOnInit() {

    if(this.editMode) {
      this.currentId = parseInt(this.activatedRoute.snapshot.params.id);
      this.itemService.getItem(this.currentId)
        .subscribe(item => {
          if(!item) {
            throw new InvalidEntryError();
          }
          this.currentQuantity = item.quantity;
          this.currentDate = item.lastExchangeDate;
          this.exceptions.push(item.name);

          // setamos essa variável depois
          delete item['lastExchangeDate'];
          delete item['id'];
          this.form.setValue(item);
        });
    }

    this.buildForm();

    this.categories$ = this.categoryService.listCategories();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.required,
        this.itemNameValidator.checkItemNameNotAvailable(this.exceptions)
      ],
      quantity: [0,
        [Validators.required, Validators.min(0)]
      ],
      alertQuantity: [
        0,
        [Validators.min(0)]
      ],
      categoryId: [
        '',
        Validators.required
      ]
    });
  }
/*
  isNumber(control: AbstractControl) {
    console.log('dada');
    let value = control.value;
    console.log(value);
    if(value) {
      value = value.toString();
      console.log(value);
      console.log(/^\d*$/.test(value) ? null: { notNumber: true });
      return /^\d*$/.test(value) ? null: { notNumber: true };
    }
    return null;
  }
*/
  editObject() {

    const item = this.form.value;
    item.id = this.currentId;

    if(this.currentQuantity != item.quantity)
      item.lastExchangeDate = new Date();
    else
      item.lastExchangeDate = this.currentDate;

    this.itemService.updateItem(item)
      .subscribe(() => {
        new Notification('Item atualizado com sucesso.');
        this.router.navigate(['estoque'])
      });
  }

  addObject() {
    let object: Item = this.form.value;
    object.lastExchangeDate = new Date();
    this.itemService.saveItem(object)
      .subscribe(() => {
        this.form.reset();
        new Notification('Item adicionado com sucesso.')
      });
  }

  delete() {
    this.itemService.deleteItem(this.currentId).subscribe(() => {
      new Notification('Item deletado com sucesso.');
      this.router.navigate(['estoque']);
    });
  }

}
