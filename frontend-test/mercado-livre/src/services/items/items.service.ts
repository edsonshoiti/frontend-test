import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemsService {

  private ENDPOINT_API = '/api';
 
  constructor (private http: Http) {}

  search(item: string) {
    let params = new URLSearchParams();
    params.set('q', item);
    return this.http.get(`${this.ENDPOINT_API}/items/`, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getById(itemId: string) {
    return this.http.get(`${this.ENDPOINT_API}/items/${itemId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();
    return body.result || { };
  }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
