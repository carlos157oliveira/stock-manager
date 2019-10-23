import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/data/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/data/item';
import { Observable } from 'rxjs';
import { InvalidEntryError } from 'src/app/core/errors/invalid-entry-error';

@Component({
  templateUrl: './item-exchange.component.html',
  styleUrls: ['./item-exchange.component.css']
})
export class ItemExchangeComponent implements OnInit {

  form: FormGroup;
  item$: Observable<Item>;
  item: Item;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params.id);
    this.item$ = this.itemService.getItem(id);
    this.item$.subscribe(item => {
      if(!item) {
        throw new InvalidEntryError();
      }
      this.item = item;
    });

    this.form = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      subtract: [true, Validators.required]
    });
  }

  exchange() {
    const exchange = this.form.value;

    if(exchange.subtract) {
      if(exchange.quantity > this.item.quantity) {
        this.form.get('quantity').setErrors({
          insufficientQuantity: true
        });
        return;
      }
      else {
        this.item.quantity -= exchange.quantity;
      }
    }
    else {
      this.item.quantity += exchange.quantity;
    }

    this.item.lastExchangeDate = new Date();

    this.itemService.updateItem(this.item).subscribe(() => {
      new Notification('Movimentação concluída com sucesso!');
      this.router.navigate(['estoque']);
    });

  }

}
