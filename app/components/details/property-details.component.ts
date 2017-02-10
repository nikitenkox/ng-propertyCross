import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'item-details',
    templateUrl: './property-details.component.html',
    styleUrls: ['./property-details.component.css']
})

export class PropertyDetailsComponent implements OnInit {
    item: Object;

    constructor(private location: Location, private route: ActivatedRoute, private propertyService: PropertyService) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.propertyService.results
            .subscribe((res: any) => {
                this.item = res.response.listings[id];
            });
    }

    goBack() {
        this.location.back();
    }
}
