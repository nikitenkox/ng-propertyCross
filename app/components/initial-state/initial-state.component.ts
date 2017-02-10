import { Component } from '@angular/core';
import { Router/*, ActivatedRoute*/ } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    templateUrl: './initial-state.component.html',
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    // recentSearches: any[] = [];
    lastSearch: any;

    constructor(private router: Router, private propertyService: PropertyService) {

    }

    getSearchVal(search: any) {
        if (search.value !== undefined) {
            this.propertyService.searchByWord(search.value, search.page)
                .subscribe((res: any) => {
                    let status = res.response.application_response_code;
                    console.log(status);
                    this.propertyService.results = res;
                    this.router.navigate(['/results'], { queryParams: { term: search.value, page: search.page } });
                });
            // this.propertyService.searchProperties(search.value, search.page);
            // this.router.navigate(['/results'], { queryParams: { term: search.value, page: search.page } });
        } else {
            this.propertyService.searchByCoords(search.latitude, search.longitude, search.page);
            this.router.navigate(['/results'], {
                queryParams: {
                    latitude: search.latitude,
                    longitude: search.longitude,
                    page: search.page
                }
            });
        }
    }
}
