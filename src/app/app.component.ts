import { Component, OnInit } from '@angular/core';

// rxjs
import { interval, fromEvent, Observable, Subscription } from 'rxjs';
import { tap, take, buffer } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  ngOnInit() {
    bufferDemo();
  }

  onRun() {
    console.log('on run');
    bufferDemo();
  }

}


export function bufferDemo() {
  const source$ = interval(1000);
  const closeSignal$ = fromEvent(document, 'click');

  const o = source$.pipe(
    tap(i => console.log(i)),
    buffer(closeSignal$),
    take(3),
  );

  run(o);
  // o.subscribe(
  //   x => console.log(x)
  // )
}

export function run(o: Observable<any>): Subscription {
  return o.subscribe({
    next: (value: any) => console.log(`Next: `, value),
    error: error => console.log(`Error: ${error}`),
    complete: () => console.log('Complete!')
  });
}
