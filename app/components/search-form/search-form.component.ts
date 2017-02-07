import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PropertyService } from '../../services/property.service';


@Component({
    moduleId: module.id,
    selector: 'search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent {
    resp: Observable<Object>;
    searchVal: string;

    constructor(private router: Router, private prorertyService: PropertyService) { }

    gotoResults(): void {
        this.prorertyService.search(this.searchVal);
        this.router.navigate(['/results']);
    }

}
