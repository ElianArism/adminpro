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
            title: 'Grafical',
            path: 'grafical',
          },
          {
            title: 'Progress',
            path: 'progress'
          },
          {
            title: 'Promises',
            path: 'promises'
          },
          {
            title: 'RxJS',
            path: 'rxjs'
          },
          
        ]
      };
  }

  get getMenu() {
    return this.menu;
  }
}
