import { Component, OnInit } from '@angular/core';

import { CareerService } from '../career.service';
import { Career } from '../career';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  careers: Career[];

  constructor(
    private careerService: CareerService,
  ) { }

  ngOnInit(): void {
    this.getCareers();
  }

  getCareers(): void {
    this.careerService.getCareers()
      .subscribe(careers => this.careers = careers);
  }

}
