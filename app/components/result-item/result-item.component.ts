import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.css']
})

export class ResultItemComponent {
    @Input()
    item: Object;
    @Input()
    index: number;
    @Input()
    isFave: boolean = false;
}
