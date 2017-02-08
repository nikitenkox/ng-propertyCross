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
    results: Object;
    totalResults: number;
    totalPages: number;

    constructor(private propertyService: PropertyService, private router: Router) { }

    ngOnInit() {
        /*this.propertyService.searchResults(this.propertyService.term)
            .then((res: any) => {
                this.results = res.response.listings;
                this.totalPages = res.response.total_pages;
                this.totalResults = res.response.total_results;
            });*/
        this.propertyService.searchRes(this.propertyService.term)
            .subscribe((res: any) => {
                this.results = res.response.listings;
                this.totalPages = res.response.total_pages;
                this.totalResults = res.response.total_results;
            });
    }

    goBack() {
        this.router.navigate(['']);
    }
}
