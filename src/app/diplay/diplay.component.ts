import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diplay',
  templateUrl: './diplay.component.html',
  styleUrls: ['./diplay.component.scss']
})
export class DiplayComponent implements OnInit {

  @Input() time:number = null;
  constructor() { }

  ngOnInit() {
  }

}
