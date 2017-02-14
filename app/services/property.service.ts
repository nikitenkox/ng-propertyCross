import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { RecentLocation } from '../shared/recent';

@Injectable()
export class PropertyService {
    private api: string = 'http://api.nestoria.co.uk/api';
    private _results: BehaviorSubject<Object> = new BehaviorSubject([]);
    public result: Observable<Object> = this._results.asObservable();
    recentSearches: RecentLocation[] = [];
    favourites: any[] = [];
    public observer: Observer<any>;
    public notification: Observable<any>;
    private defaultParams: Object;

    constructor(
        private jsonp: Jsonp,
        private router: Router
    ) {
        this.defaultParams = {
            country: 'uk',
            pretty: '1',
            action: 'search_listings',
            encoding: 'json',
            listing_type: 'buy',
            number_of_results: '10',
            callback: 'JSONP_CALLBACK'
        };
        this.notification = new Observable((observer: any) => this.observer = observer).share();
    }

    searchByWord(term: string, page: number) {
        let searchParams = this.getURLParams({ place_name: term, page: page });
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => {
                return res.json();
            })
            .share()
            .subscribe(res => {
                console.log(res);
                this._results.next(res);
                let status = res.response.application_response_code;
                let location = res.request.location;
                let locations = res.response.locations;
                let count = res.response.total_results;
                let errorText;
                if (status === '100' || status === '101' || status === '110') {
                    this.router.navigate(['/results'], { queryParams: { term: term, page: page } });
                    this.addRecent(location, count);
                } else if (status === '200' || status === '202') {
                    errorText = res.response.application_response_text;
                } else {
                    errorText = res.response.application_response_text;
                }
                this.observer.next({
                    locations: locations,
                    status: status,
                    error: errorText
                });
            });
        return obs;
    }

    searchByCoords(latitude: number, longitude: number, page: number) {
        let searchParams = this.getURLParams({ centre_point: latitude + ',' + longitude, page: page });
        let obs = this.jsonp.get(this.api, { search: searchParams })
            .map(res => res.json())
            .share()
            .subscribe(res => {
                this._results.next(res);
                let status = res.response.application_response_code;
                let locations = res.response.locations;
                let errorText;
                if (status === '100' || status === '101' || status === '110') {
                    this.router.navigate(['/results'], {
                        queryParams: {
                            latitude: latitude,
                            longitude: longitude,
                            page: page
                        }
                    });
                } else if (status === '200' || status === '202') {
                    errorText = res.response.application_response_text;
                } else {
                    errorText = res.response.application_response_text;
                }
                this.observer.next({
                    locations: locations,
                    status: status,
                    error: errorText
                });
            });
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
                coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude;
                /*coords.latitude = 53.41058;
                coords.longitude = -2.97794;*/
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
        let index = this.recentSearches.findIndex((e: RecentLocation) => e.location === location);
        if (index === -1) {
            this.recentSearches.unshift(item);
        } else {
            this.recentSearches.splice(index, 1);
            this.recentSearches.unshift(item);
        }
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

    saveToFaves(item: any) {
        this.favourites.push(item);
        localStorage.setItem('faves', JSON.stringify(this.favourites));
    }

    getFaves() {
        return JSON.parse(localStorage.getItem('faves'));
    }
}

