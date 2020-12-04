import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// declarar una funcion global (en este caso de un archivo js externo)
declare function initCustom();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})

export class PagesComponent implements OnInit {
  constructor(private SettingsService: SettingsService) {}
  ngOnInit(): void {
    initCustom();

  }

}
