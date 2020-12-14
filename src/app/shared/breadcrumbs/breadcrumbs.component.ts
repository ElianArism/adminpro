import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string;
  public titleSub: Subscription;
  constructor(private router: Router) {
    // se le asigna la subscription para poder realizar el unsubscribe cuando se desloguee un usuario
    this.titleSub = 
    this.getRouterData()
      .subscribe(({title}) => {
        this.title = title;
        document.title = `AdminPro - ${title}`;
      })


  }

  getRouterData() {
    // de este observable se consigue la data del router
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSub.unsubscribe(); // al desloguearse se desubscribe
  }

}
