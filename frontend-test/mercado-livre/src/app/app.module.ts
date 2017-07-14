import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './../components/search-box/search-box.component';
import { SearchItemComponent } from './../components/search-item/search-item.component';
import { HomeComponent } from './../views/home/home.component';
import { SearchResultComponent } from './../views/search-result/search-result.component';
import { ItemDetailComponent } from './../views/item-detail/item-detail.component';
import { ItemsService } from './../services/items/items.service';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: 'items', component: SearchResultComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    ItemDetailComponent,
    SearchBoxComponent,
    SearchItemComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
