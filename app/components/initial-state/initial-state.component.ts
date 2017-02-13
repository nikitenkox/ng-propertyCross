import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    templateUrl: './initial-state.component.html',
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    response: any;
    errorState: boolean = false;
    initState: boolean = true;
    recentSearches: Object[];

    constructor(
        private router: Router,
        private propertyService: PropertyService
    ) {
        this.recentSearches = this.propertyService.getRecentSearches();
    }

    moveToSearch(location: string) {
        this.propertyService.searchByWord(location, 1);
        this.router.navigate(['/results'], { queryParams: { term: location, page: 1 } });
    }

    getSearchVal(search: any) {
        if (search.value !== undefined) {
            this.propertyService.searchByWord(search.value, search.page)
                .subscribe((res: any) => {
                    this.response = res.response;
                    let location = res.request.location;
                    let count = res.response.total_results;
                    // this.propertyService.addRecent(location, count);
                    let status = res.response.application_response_code;
                    console.log(status);
                    if (res.response.application_response_code === 100) {
                        // this.router.navigate(['/results'], { queryParams: { term: search.value, page: search.page } });
                    } else {
                        console.log('error');
                    }
                });
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
