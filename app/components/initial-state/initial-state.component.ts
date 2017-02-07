import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    templateUrl: './initial-state.component.html',
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    resp: Observable<Object[]>;

    constructor(private wikipediaService: PropertyService) { }

    search(location: string) {
        this.wikipediaService.search(location)
            .subscribe(res => {
                this.resp = res.response.listings;
                console.log(res);
            });
    }
}
