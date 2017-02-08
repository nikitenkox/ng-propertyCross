import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs/Observable';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'item-details',
    templateUrl: './property-details.component.html',
    styleUrls: ['./property-details.component.css']
})

export class PropertyDetailsComponent implements OnInit {
    title: string;
    price: string;
    imgUrl: string;
    beds: string;
    bathrooms: string;
    summary: string;

    constructor(private location: Location, private route: ActivatedRoute, private propertyService: PropertyService) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        /*this.propertyService.searchResults(this.propertyService.term)
            .then((res: any) => {
                this.itemDetails = res.response.listings[id].price_formatted;
            });*/
        this.propertyService.searchRes(this.propertyService.term)
            .subscribe((res: any) => {
                this.title = res.response.listings[id].title;
                this.price = res.response.listings[id].price_formatted;
                this.beds = res.response.listings[id].bedroom_number;
                this.bathrooms = res.response.listings[id].bathroom_number;
                this.summary = res.response.listings[id].summary;
                this.imgUrl = res.response.listings[id].img_url;
            });
    }
}
