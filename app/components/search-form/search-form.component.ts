import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent {
    searchVal: string;
    page: number = 1;

    constructor(private router: Router, private propertyService: PropertyService) { }

    gotoResults(): void {
        this.propertyService.searchProperties(this.searchVal, this.page);
        this.router.navigate(['/results'], { queryParams: { term: this.searchVal, page: this.page } });
    }

    getLocation(event: Event): void {
        // ********* Fake coords (Liverpool) **********
        // latitude - (53.41058);
        // longitude - (-2.97794);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // this.propertyService.searchByCoords(position.coords.latitude, position.coords.longitude, this.page);
                this.propertyService
                    .searchByCoords(53.41058, -2.97794, this.page);
                this.router
                    .navigate(['/results'], { queryParams: { latitude: 53.41058, longitude: -2.97794, page: this.page } });
                /*.navigate(['/results'], {
                    queryParams: {
                        latitude: position.coords.latitude, longitude: position.coords.longitude, page: this.page
                    }
                });*/
            });
        }
    }
}
