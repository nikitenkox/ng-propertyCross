import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['favourites.component.css']
})

export class FavouritesComponent implements OnInit {
    faves: any[];

    constructor(
        private router: Router,
        private propertyService: PropertyService
        ) { }

    ngOnInit() {
        this.faves = this.propertyService.getFaves();
    }

    goHome() {
        this.router.navigate(['/home']);
    }
}
