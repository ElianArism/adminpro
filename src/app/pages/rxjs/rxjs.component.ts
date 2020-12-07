import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{
  // al tener este store de tipo subscription podemos almacenar los valores pasados por el observable imprimirValores
  // y con el mismo tambien podemos desubscribirnos de el
  public storeValues: Subscription;
  constructor() {
    // subscribirse al observable para ser notificado por el observer
    this.retornaObservable()
    // pipe permite encadenar varios callbacks/operaciones
    .pipe(
      // si el observer lanza un error, esta funcion lo captura e intentara realizar nuevamente la operacion
      // la cantidad de veces que le pasemos como parametro
      retry(1)
    )
    .subscribe(
      
      // callback para siguientes valores
      value => console.log(value),

      // callback para cuando se lanze un error 
      err => console.log(err),

      // callback para cuando finalice la ejecucion
      () => console.log('Complete')
    );

    this.retornaInterval()
    // cuando la unica instruccion de una funcion es pasar un argumento como parametro a otra puede abreviarse
    // de la siguiente manera, en vez de .subscribe(value => console.log(value));
      .subscribe(console.log);

    
    this.storeValues = this.imprimirValores()
      // esto imprime valores hasta que la ram explote aunque ya no estemos en la pagina en donde requerimos la informacion
      // para evitarlo se debe desuscribirse del observable 
      // la manera de hacerlo en angular generalmente es desde el ciclo de vida OnDestroy
      .subscribe(console.log);
  }

  retornaInterval(): Observable<string> { 
    return interval(300) // Interval es un observable que cuando transcurra un intervalo de un segundo ejecuta lo sig
      .pipe(
        // take escoje cuantos valores van a tomarse del observable, y fuerza el complete del mismo
        take(10),
        map(value => value + 1),
        // filter filtra valores segun una condicion (si es par pasa el valor, sino se descarta)
        filter(value => (value % 2 === 0) ? true : false),
        // map recibe los valores del observable y los muta segun las instrucciones dadas
        map(value => `Intervalo ${value}`)
      );
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    // crear Observable (cuando se desea almacenar el observer, como convencion se coloca el signo $ al final)
    return new Observable<number>(observer => {
      
      const interval = setInterval(() => {
        i++
        observer.next(i); // ir al siguiente valor

        
        if(i === 3) {
          // finalizar ejecucion del interval 
          clearInterval(interval);

          // finalizar ejecucion del observer 
          // (es importante hacerlo porque si no se corta el flujo de datos este seguira ejecutandose consumiendo memoria)
          observer.complete();
        }

        if(i === 2) {
          console.warn('error i = 2');
          // lanzar un error, al hacerlo ya no podra ejecutarse el complete, ya que solo se ejecuta cuando la operacion fue
          // satisfactoria
          observer.error();
        }
      
      }, 1000);

    });
  }

  imprimirValores(): Observable<number> {
    return interval(400);
  }

  ngOnDestroy(): void {
    this.storeValues.unsubscribe();
  }
}
