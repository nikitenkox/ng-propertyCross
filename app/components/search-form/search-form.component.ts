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

    getLocation(event: Event) {
        // event.preventDefault();
        this.prorertyService.latitude.next(53.41058);
        this.prorertyService.longitude.next(-2.97794);
        this.router.navigate(['/results']);
        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(`lat ${position.coords.latitude} long ${position.coords.longitude}`);
            });
        }*/
        /*this.prorertyService.searchByLocation(53.41058, -2.97794, 1)
            .subscribe(res => console.log(res));*/
    }

}
