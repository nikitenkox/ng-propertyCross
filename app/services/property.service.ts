import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PropertyService {
    api: string = 'http://api.nestoria.co.uk/api';
    results: any;
    item: Observable<Object>;
    term: string = '';

    constructor(private jsonp: Jsonp) { }

    searchRes(term: string): Observable<Object> {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
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
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', this.term);
        return this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response.listings[id]);
    }

    search(term: string) {
        this.term = term;
    }

    /*searchResults(term: string): Promise<any> {
        return new Promise(resolve => {
            let api = 'http://api.nestoria.co.uk/api';
            let searchParams: URLSearchParams = new URLSearchParams();
            searchParams.set('country', 'uk');
            searchParams.set('pretty', '1');
            searchParams.set('action', 'search_listings');
            searchParams.set('encoding', 'json');
            searchParams.set('listing_type', 'buy');
            searchParams.set('place_name', term);
            searchParams.set('number_of_results', '50');
            searchParams.set('callback', 'JSONP_CALLBACK');
            this.jsonp
                .get(api, { search: searchParams })
                .map(response => response.json())
                .subscribe((res: any) => {
                    resolve(res);
                });
        });
}*/
}
