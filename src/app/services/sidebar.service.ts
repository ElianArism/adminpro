import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu: any[];

  constructor() {
    this.menu = [
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
      },
      {
        title: 'maintenance',
        icon: 'mdi mdi-folder-lock-open',
        submenu: [
          {
            title: 'usuarios',
            path: 'usuarios'
          },
          {
            title: 'hospitales',
            path: 'hospitales',
          },
          {
            title: 'medicos',
            path: 'medicos'
          },
        ]
      }
    ];
  }

  get getMenu() {
    return this.menu;
  }
}
