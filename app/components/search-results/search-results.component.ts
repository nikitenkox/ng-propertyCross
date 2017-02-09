import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {
    response: Object;


    page: number;
    term: string;
    latitude: number;
    longitude: number;

    constructor(private propertyService: PropertyService, private router: Router) { }

    ngOnInit() {
        this.propertyService.results.subscribe(res => this.response = res);
        /*this.propertyService.page
            .subscribe(page => this.page = page);
        this.propertyService.queryTerm
            .subscribe(term => this.term = term);
        this.propertyService.latitude
            .subscribe(lat => this.latitude = lat);
        this.propertyService.longitude
            .subscribe(long => this.longitude = long);
        if (this.latitude !== 0 || this.longitude !== 0) {
            this.propertyService.searchByLocation(this.latitude, this.longitude, this.page)
                .subscribe(res => {
                    this.response = res;
                });
        } else {
            this.propertyService.searchRes(this.term, this.page)
                .subscribe((res: any) => {
                    this.response = res;
                });
        }*/
    }

    goBack() {
        /*this.propertyService.page.next(1);
        this.propertyService.latitude.next(0);
        this.propertyService.longitude.next(0);
        this.propertyService.queryTerm.next('');*/
        this.router.navigate(['']);
    }

    prevPage() {

        /*this.page--;
        this.propertyService.page.next(this.page);
        if (this.latitude !== 0 || this.longitude !== 0) {
            this.propertyService.searchByLocation(this.latitude, this.longitude, this.page)
                .subscribe(res => {
                    this.response = res;
                });
        } else {
            this.propertyService.searchRes(this.term, this.page)
                .subscribe((res: any) => {
                    this.response = res;
                });
        }*/
    }

    nextPage() {
        this.propertyService.searchProperties('leeds', 2);
        /*this.page++;
        this.propertyService.page.next(this.page);
        if (this.latitude !== 0 || this.longitude !== 0) {
            this.propertyService.searchByLocation(this.latitude, this.longitude, this.page)
                .subscribe(res => {
                    this.response = res;
                });
        } else {
            this.propertyService.searchRes(this.term, this.page)
                .subscribe((res: any) => {
                    this.response = res;
                });
        }*/
        window.scrollTo(0, 0);
    }
}
