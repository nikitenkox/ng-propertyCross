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

    constructor(private router: Router, private propertyService: PropertyService) { }

    gotoResults(): void {
        // this.propertyService.queryTerm.next(this.searchVal);
        this.propertyService.searchProperties(this.searchVal, 1);
        this.router.navigate(['/results']);
    }

    getLocation(event: Event): void {
        // ********* Fake coords (Liverpool) **********
        // this.propertyService.latitude.next(53.41058);
        // this.propertyService.longitude.next(-2.97794);
        this.router.navigate(['/results']);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.propertyService.latitude.next(position.coords.latitude);
                this.propertyService.longitude.next(position.coords.longitude);
            });
        }
    }

}
