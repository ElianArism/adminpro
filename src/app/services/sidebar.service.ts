import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu: Object;
  constructor() {
    this.menu = 
      {
        title: 'Dashboard',
        icon: 'mdi mdi-gauge',
        submenu: [
          {
            title: 'Main',
            path: ''
          },
          {
            title: 'Progress',
            path: 'progress'
          },
          {
            title: 'Grafical',
            path: 'grafical',
          }
        ]
      };
  }

  get getMenu() {
    return this.menu;
  }
}
