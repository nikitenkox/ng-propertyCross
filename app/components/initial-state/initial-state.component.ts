import { Component } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    templateUrl: './initial-state.component.html',
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    recentSearches: any[] = [];

    constructor(private propertyService: PropertyService) {
        this.propertyService.results
            .subscribe(data => {
                this.recentSearches.push(data);
            });
    }
}
