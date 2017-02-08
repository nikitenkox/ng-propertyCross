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

    constructor(private router: Router, private prorertyService: PropertyService) { }

    gotoResults(): void {
        this.prorertyService.queryTerm.next(this.searchVal);
        this.router.navigate(['/results']);
    }

    getLocation(event: Event): void {
        // ********* Fake coords (Liverpool) **********
        // this.prorertyService.latitude.next(53.41058);
        // this.prorertyService.longitude.next(-2.97794);
        this.router.navigate(['/results']);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.prorertyService.latitude.next(position.coords.latitude);
                this.prorertyService.longitude.next(position.coords.longitude);
            });
        }
    }

}
