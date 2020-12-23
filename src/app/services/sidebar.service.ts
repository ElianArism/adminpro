import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu: any[];

  constructor() {
    this.cargarMenu();
  }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  get getMenu() {
    return this.menu;
  }
}
