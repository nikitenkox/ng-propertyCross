import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '../../services/property.service';

import './property-details.component.scss';

@Component({
    selector: 'item-details',
    templateUrl: './app/components/details/property-details.component.html',
    styleUrls: [
        './app/components/details/property-details.component.css'
        ]
})

export class PropertyDetailsComponent implements OnInit {
    item: Object;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private propertyService: PropertyService
    ) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.route.queryParams
            .subscribe((params: any) => {
                if (params.isFave === 'true') {
                    this.item = this.propertyService
                        .getFaves()[id];
                } else {
                    this.propertyService.result
                        .subscribe((res: any) => {
                            this.item = res.response.listings[id];
                        });
                }
            });
    }

    goBack() {
        this.location.back();
    }

    addToFaves() {
        this.propertyService.saveToFaves(this.item);
    }
}
