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
    state: any;
    recentSearches: Object[];

    constructor(
        private router: Router,
        private propertyService: PropertyService
    ) {
        this.recentSearches = this.propertyService.getRecentSearches();
    }

    moveToSearch(location: string) {
        this.propertyService.searchByWord(location, 1);
        this.propertyService.notification
            .subscribe(res => {
                this.state = res;
            });
    }

    clean() {
        localStorage.clear();
    }

    goFaves() {
        this.router.navigate(['/favourites']);
    }

    getSearchVal(search: any) {
        if (search.value !== undefined) {
            this.propertyService.searchByWord(search.value, search.page);
        } else {
            this.propertyService.searchByCoords(search.latitude, search.longitude, search.page);
        }
        this.propertyService.notification
            .subscribe(res => {
                this.state = res;
            });
    }
}
