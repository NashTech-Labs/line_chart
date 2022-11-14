import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Line Chart';
  data: any[] = [
  {date: new Date('2010-01-01'), value: 13},
  {date: new Date('2010-02-04'), value: 18},
  {date: new Date('2010-03-05'), value: 11},
  {date: new Date('2010-04-06'), value: 11},
  {date: new Date('2010-05-07'), value: 14},
  {date: new Date('2010-06-08'), value: 17},
  {date: new Date('2010-07-09'), value: 21},
  {date: new Date('2010-08-10'), value: 21},
  {date: new Date('2010-09-11'), value: 11},
  {date: new Date('2010-010-11'), value: 36},
  {date: new Date('2010-11-11'), value: 7},
  ];

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  line!: d3.Line<[number, number]>;

constructor() {

 this.width = 600 - this.margin.left - this.margin.right;
      this.height = 400 - this.margin.top - this.margin.bottom;}

ngOnInit() {
  this.buildSvg();
      this.addXandYAxis();
      this.drawLineAndPaths();
}
private buildSvg() {
      this.svg = d3.select('svg')
          .append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  private addXandYAxis() {
       // range of data configuring
       this.x = d3Scale.scaleTime().range([0, this.width]);
       this.y = d3Scale.scaleLinear().range([this.height, 0]);
       this.x.domain(d3Array.extent(this.data, (d) => d.date ));
       this.y.domain(d3Array.extent(this.data, (d) => d.value ));

      // Configure the Y Axis
      this.svg.append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));
      // Configure the Y Axis
      this.svg.append('g')
          .attr('class', 'axis axis--y')
          .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPaths() {
    this.line = d3Shape.line()
        .x( (d: any) => this.x(d.date) )
        .y( (d: any) => this.y(d.value) );
    this.svg.append('path')
        .datum(this.data)
        .attr("fill", "none").attr("stroke", "steelblue").attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", this.line);;
}

}
