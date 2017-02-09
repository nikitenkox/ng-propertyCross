import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class PropertyService {
    api: string = 'http://api.nestoria.co.uk/api';

    private _results: BehaviorSubject<Object[]> = new BehaviorSubject([]);
    public results: Observable<Object[]> = this._results.asObservable();

    resentSearchArr: string[] = [];
    page = new BehaviorSubject(1);
    queryTerm = new BehaviorSubject('');
    latitude = new BehaviorSubject(0);
    longitude = new BehaviorSubject(0);

    constructor(private jsonp: Jsonp) { }

    searchProperties(term: string, page: number) {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
        searchParams.set('page', page.toString());
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response)
            .subscribe(res => this._results.next(res));
        return obs;
    }

    searchRes(term: string, page: number): Observable<Object> {
        let searchParams = this.setDefaultSearchParams();
        searchParams.set('place_name', term);
        searchParams.append('page', page.toString());
        return this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response);
    }

    searchByLocation(latitude: number, longitude: number, page: number): Observable<Object> {
        let searchParams = this.setDefaultSearchParams();
        searchParams.append('page', page.toString());
        searchParams.append('centre_point', + latitude + ',' + longitude);
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
        let term: string;
        let page: number;
        let lat: number;
        let long: number;
        this.queryTerm
            .subscribe(val => term = val);
        this.page
            .subscribe(val => page = val);
        this.latitude
            .subscribe(latitude => lat = latitude);
        this.longitude
            .subscribe(longitude => long = longitude);
        let searchParams = this.setDefaultSearchParams();
        if (lat !== 0 || long !== 0) {
            searchParams.append('centre_point', + lat + ',' + long);
        } else {
            searchParams.set('place_name', term);
        }
        searchParams.append('page', page.toString());
        return this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json().response.listings[id]);
    }

    resentSearchesSetter() {
        this.queryTerm
            .subscribe(val => {
                if (val && this.resentSearchArr.indexOf(val) === -1) {
                    this.resentSearchArr.push(val);
                }
            });
        return this.resentSearchArr;
    }
}
/*
BehaviorSubject (private) is list of returned houses
return this list as: return this.list.asObservable()
*/
