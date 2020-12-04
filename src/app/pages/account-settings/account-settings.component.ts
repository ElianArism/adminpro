import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})

export class AccountSettingsComponent {
  public selectores;
  constructor(private SettingsService: SettingsService) {
    this.selectores = '';
  }

  ngOnInit(): void {
    this.selectores = document.getElementsByClassName('selector');
    this.SettingsService.addCheck(null, this.selectores);
  }

  changeTheme(theme: string, e: Event) {
    this.SettingsService.changeTheme(theme,e, this.selectores);
  }
}
