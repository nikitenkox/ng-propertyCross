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
    page: number = 1;

    constructor(private propertyService: PropertyService, private router: Router) { }

    ngOnInit() {
        this.propertyService.searchRes(this.propertyService.term, this.page)
            .subscribe((res: any) => {
                this.response = res;
            });
    }

    goBack() {
        this.router.navigate(['']);
    }

    prevPage() {
        this.page--;
        this.propertyService.searchRes(this.propertyService.term, this.page)
            .subscribe((res: any) => {
                this.response = res;
            });
    }

    nextPage() {
        this.page++;
        this.propertyService.searchRes(this.propertyService.term, this.page)
            .subscribe((res: any) => {
                this.response = res;
            });
        window.scrollTo(0, 0);
    }
}
