import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PropertyService {

    constructor(private jsonp: Jsonp) { }

    search(term: string): Observable<any> {
        let api = 'http://api.nestoria.co.uk/api';
        // let wikiUrl = 'http://en.wikipedia.org/w/api.php';

        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('country', 'uk');
        searchParams.set('pretty', '1');
        searchParams.set('action', 'search_listings');
        searchParams.set('encoding', 'json');
        searchParams.set('listing_type', 'buy');
        searchParams.set('place_name', term);
        searchParams.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
            .get(api, { search: searchParams })
            .map(response => response.json());
    }
}
