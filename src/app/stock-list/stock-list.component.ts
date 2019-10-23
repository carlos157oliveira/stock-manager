import { Component, OnInit } from '@angular/core';
import { ItemService } from '../data/item.service';
import { CategoryService } from '../data/category.service';
import { Item } from '../data/item';
import { Category } from '../data/category';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  private _itens: Item[];
  categories: Category[];

  totalItemType = 0;
  totalItens = 0;

  itemNameSearch = '';

  form: FormGroup;

  totalPageNumber = 0;
  pageSize = 10;
  currentPageNumber = 1;
  currentLength: number;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [''],
      categoryId: [null],
      onlyLowQuantity: [null]
    });

    this.form.get('name').valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.itemNameSearch = value;
    });

    this.categoryService.listCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.itemService.listItens().subscribe(itens => {
          this.totalItemType = itens.length;
          itens.forEach(item => this.totalItens += item.quantity);
          this.totalPageNumber = Math.ceil(this.totalItemType / this.pageSize);
          this.currentLength = this.totalItens;
          this._itens = itens;
        });
      });
  }

  getCategory(id) {
    return this.categories.filter(category => category.id == id)[0];
  }


  get itens() {

    if(!this._itens) return;

    const categoryId = this.form.get('categoryId').value;
    const onlyLowQuantity = this.form.get('onlyLowQuantity').value;

    let result = this._itens.filter(item => {

      let condition = true;

      if(categoryId)
        condition = item.categoryId == categoryId;

      if(this.itemNameSearch)
        condition = condition && item.name.toLowerCase().indexOf(this.itemNameSearch.toLowerCase()) >= 0;

      if(onlyLowQuantity){
        if(item.alertQuantity != null) {
          condition = condition && item.quantity <= item.alertQuantity;
        }
        else
          condition = false;
      }

      return condition;
    });
    this.totalPageNumber = Math.ceil(result.length / this.pageSize);

    if(result.length != this.currentLength) {
      this.currentLength = result.length;
      this.changePage(1);
    }

    return result.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize);
  }

  resetar() {
    this.form.reset();
  }

  getArrayOfSize(size: number) {
    return Array(size);
  }

  isCurrentPage(page: number) {
    return this.currentPageNumber == page;
  }

  changePage(page: number) {
    this.currentPageNumber = page;
  }

}
