import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../services/items/items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: any;
  msgError: string;

  constructor(private itemsService: ItemsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let itemId = this.route.snapshot.params['id'];
    this.itemsService.getById(itemId)
      .subscribe((result) => {
        this.item = result;
      },
      (error) =>  this.msgError = <any>error);
  }
}
