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
    response: Object;
    errorState: boolean = false;
    initState: boolean = true;

    constructor(
        private router: Router,
        private propertyService: PropertyService
    ) {}

    getSearchVal(search: any) {
        if (search.value !== undefined) {
            this.propertyService.searchByWord(search.value, search.page)
                .subscribe((res: any) => {
                    this.response = res.response;
                    let status = res.response.application_response_code;
                    if (status < 200) {
                        console.log('less 200');
                        this.router.navigate(['/results'], { queryParams: { term: search.value, page: search.page } });
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
