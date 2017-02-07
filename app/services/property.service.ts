import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PropertyService {
    results: any;

    constructor(private jsonp: Jsonp) { }

    search(term: string) {
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
            .subscribe((res: any) => this.results = res);
    }

    getRes(): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.results), 2000);
        });
    }
}
