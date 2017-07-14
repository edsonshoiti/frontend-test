import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() item: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToDetail(itemId) {
    this.router.navigate(['/items',itemId]);
  }
}
