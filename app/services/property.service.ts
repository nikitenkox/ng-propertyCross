import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { RecentLocation } from '../shared/recent';

@Injectable()
export class PropertyService {
    private api: string = 'http://api.nestoria.co.uk/api';
    private _results: BehaviorSubject<Object> = new BehaviorSubject([]);
    public result: Observable<Object> = this._results.asObservable();
    recentSearches: RecentLocation[] = [];
    private defaultParams: Object;

    constructor(private jsonp: Jsonp) {
        this.defaultParams = {
            country: 'uk',
            pretty: '1',
            action: 'search_listings',
            encoding: 'json',
            listing_type: 'buy',
            number_of_results: '10',
            callback: 'JSONP_CALLBACK'
        };
    }

    searchByWord(term: string, page: number) {
        let searchParams = this.getURLParams({ place_name: term, page: page });
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json()).share();
        obs.subscribe(res => this._results.next(res));
        return obs;
    }

    searchByCoords(latitude: number, longitude: number, page: number) {
        let searchParams = this.getURLParams({ centre_point: latitude + ',' + longitude, page: page });
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json()).share();
        obs.subscribe(res => this._results.next(res));
        return obs;
    }

    getURLParams(params: Object) {
        let urlParams: URLSearchParams = new URLSearchParams();
        Object.assign(params, this.defaultParams);
        Object.keys(params)
            .forEach((key) => {
                urlParams.set(key, params[key]);
            });
        return urlParams;
    }


    getLocation(): Promise<any> {
        // ********* Fake coords (Liverpool) **********
        // latitude - (53.41058);
        // longitude - (-2.97794);
        let coords: any = {};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                /*coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude;*/
                coords.latitude = 53.41058;
                coords.longitude = -2.97794;
            });
        }
        return Promise.resolve(coords);
    }



    getRecentSearches() {
        if (localStorage.getItem('recent')) {
            this.load();
        } else {
            this.save();
        }
        return this.recentSearches;
    }

    addRecent(location: string, count: number) {
        this.load();
        let item = new RecentLocation(location, count);
        console.log(this.recentSearches.findIndex((e: RecentLocation) => e.location === location));
        this.recentSearches.unshift(item);
        this.save();
    }

    private save() {
        try {
            localStorage.setItem('recent', JSON.stringify(this.recentSearches));
        } catch (err) {
            console.error(err);
        }
    }

    private load() {
        try {
            this.recentSearches = JSON.parse(localStorage.getItem('recent'));
        } catch (err) {
            console.error(err);
        }
    }
}

