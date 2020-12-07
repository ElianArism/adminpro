import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {
  title: string
  constructor() {
    this.title = '';
  }

  ngOnInit(): void {

    this.getUsuarios()
      .then(usuarios => console.log(usuarios));
  }
  
  // forma de uso general de promises en Angular
  getUsuarios(): Promise<JSON> {
    return new Promise((resolve, reject) => {
      const url = 'https://reqres.in/api/users?page=1';
      fetch(url)
        .then(res => res.json())
        .then(json => resolve(json.data))
        .catch(err => reject(err));
    }); 
  }
}
