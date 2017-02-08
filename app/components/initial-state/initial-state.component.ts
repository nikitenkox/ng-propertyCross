import { Component } from '@angular/core';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    templateUrl: './initial-state.component.html',
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    recentSearch: string[];

    constructor(private propertyService: PropertyService) {
        this.recentSearch = this.propertyService.resentSearchesSetter();
    }
}
