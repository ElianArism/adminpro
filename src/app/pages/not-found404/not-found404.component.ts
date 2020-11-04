import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.css']
})
export class NotFound404Component implements OnInit {
  public year: number = new Date().getFullYear(); 
  constructor() { }

  ngOnInit(): void {
  }

}
