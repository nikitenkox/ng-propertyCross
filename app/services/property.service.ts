import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class PropertyService {
    api: string = 'http://api.nestoria.co.uk/api';
    page = new BehaviorSubject(1);
    queryTerm = new BehaviorSubject('');

    constructor(private jsonp: Jsonp) { }

    searchRes(term: string, page: number): Observable<Object> {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
        searchParams.append('page', page.toString());
        return this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response);
    }

    setDefaultSearchParams() {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('country', 'uk');
        searchParams.set('pretty', '1');
        searchParams.set('action', 'search_listings');
        searchParams.set('encoding', 'json');
        searchParams.set('listing_type', 'buy');
        searchParams.set('number_of_results', '50');
        searchParams.set('callback', 'JSONP_CALLBACK');
        return searchParams;
    }

    searchSingle(id: number) {
        let term;
        let page: number;
        this.queryTerm
            .subscribe(val => term = val);
        this.page
            .subscribe(val => page = val);
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
        searchParams.append('page', page.toString());
        return this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response.listings[id]);
    }
}
