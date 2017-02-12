import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class PropertyService {
    private api: string = 'http://api.nestoria.co.uk/api';
    private _results: BehaviorSubject<Object> = new BehaviorSubject([]);
    public result: Observable<Object> = this._results.asObservable();

    constructor(private jsonp: Jsonp) { }

    searchByWord(term: string, page: number) {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
        searchParams.set('page', page.toString());
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json()).share();
        obs.subscribe(res => this._results.next(res));
        return obs;
    }

    searchByCoords(latitude: number, longitude: number, page: number) {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('page', page.toString());
        searchParams.set('centre_point', + latitude + ',' + longitude);
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json()).share();
        obs.subscribe(res => this._results.next(res));
        return obs;
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
}

