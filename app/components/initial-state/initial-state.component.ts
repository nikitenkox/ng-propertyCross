import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PropertyService } from '../../services/property.service';

@Component({
    moduleId: module.id,
    selector: 'initial-state',
    // templateUrl: './initial-state.component.html',
    template: `
    <h1>Wikipedia Demo</h1>
    <p>Search after each keystroke</p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>`,
    styleUrls: ['./initial-state.component.css']
})

export class InitialStateComponent {
    items: Observable<string[]>;

    constructor(private wikipediaService: PropertyService) { }

    search(term: string) {
        this.items = this.wikipediaService.search(term);
    }
}
