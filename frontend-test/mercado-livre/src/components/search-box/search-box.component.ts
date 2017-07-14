import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
	item: string;
	
  constructor(private router: Router) { }

  ngOnInit() { }

  goToHome() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.router.navigate(['/items'], 
      { queryParams: { search: this.item }
    });
  }
}
