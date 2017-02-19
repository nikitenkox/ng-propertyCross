import { Component, Input } from '@angular/core';

@Component({
    selector: 'result-item',
    templateUrl: './app/components/result-item/result-item.component.html',
    styleUrls: ['./app/components/result-item/result-item.component.css']
})

export class ResultItemComponent {
    @Input()
    item: Object;
    @Input()
    index: number;
    @Input()
    isFave: boolean = false;
}
