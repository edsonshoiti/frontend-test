import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ItemsService } from './../../services/items/items.service';
import { SearchBoxComponent } from './../../components/search-box/search-box.component';
import { SearchItemComponent } from './../../components/search-item/search-item.component';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  categories: string[] = [];
  items: object[];
  errorMessage: string;

  constructor(private itemsService: ItemsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .switchMap((params) => this.itemsService.search(params['search']))
      .subscribe((result) => {
        this.items = result.items;
        this.categories = result.categories;
      },
      (error) =>  this.errorMessage = <any>error);
  }
  trackItemId(index, item) {
    return item.id
  }
}
