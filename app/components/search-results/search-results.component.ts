import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(
        private activatedRoute: ActivatedRoute,
        private propertyService: PropertyService,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.page = params['page'];
                this.term = params['term'] || undefined;
                this.latitude = params['latitude'] || undefined;
                this.longitude = params['longitude'] || undefined;
            });
        this.propertyService.result
            .subscribe((res: any) => {
                this.response = res.response;
            });
    }

    goBack() {
        this.router.navigate(['']);
        this.latitude = undefined;
        this.longitude = undefined;
        this.page = 1;
        this.term = undefined;
    }

    navigateToPage() {
        if (this.latitude !== undefined && this.longitude !== undefined) {
            this.router.navigate(['/results'], {
                queryParams:
                {
                    latitude: this.latitude,
                    longitude: this.longitude,
                    page: this.page
                }
            });
            // this.propertyService.searchByCoords(position.coords.latitude, position.coords.longitude, this.page);
            this.propertyService.searchByCoords(53.41058, -2.97794, this.page);
        } else {
            this.router.navigate(['/results'], {
                queryParams:
                {
                    term: this.term,
                    page: this.page
                }
            });
            this.propertyService.searchByWord(this.term, this.page);
        }
    }

    prevPage() {
        --this.page;
        this.navigateToPage();
    }

    nextPage() {
        ++this.page;
        this.navigateToPage();
        window.scrollTo(0, 0);
    }
}
