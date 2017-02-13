import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit {
    searchVal: string;
    coords: any;
    page: number = 1;
    @Output()
    sendSearchVal = new EventEmitter();

    constructor(
        private router: Router,
        private propertyService: PropertyService
    ) { }

    gotoResults(): void {
        this.sendSearchVal.emit({
            value: this.searchVal,
            page: this.page
        });
    }

    ngOnInit() {
        this.propertyService.getLocation()
            .then((location) => {
                this.coords = location;
            });
    }

    getLocation(event: Event): void {
        this.sendSearchVal.emit({
            value: undefined,
            latitude: this.coords.latitude,
            longitude: this.coords.longitude,
            page: this.page
        });
    }
}

/*this.sendCoords.emit({
                    value: undefined,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    page: this.page
                });*/
                // this.propertyService.searchByCoords(position.coords.latitude, position.coords.longitude, this.page);
                /*this.propertyService
                    .searchByCoords(53.41058, -2.97794, this.page);*/
                /*this.router
                    .navigate(['/results'], { queryParams: { latitude: 53.41058, longitude: -2.97794, page: this.page } });*/

                /*.navigate(['/results'], {
                    queryParams: {
                        latitude: position.coords.latitude, longitude: position.coords.longitude, page: this.page
                    }
                });*/

                        // this.propertyService.searchProperties(this.searchVal, this.page);
        // this.router.navigate(['/results'], { queryParams: { term: this.searchVal, page: this.page } });

