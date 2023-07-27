import { Route } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { TestComponent } from './test/test.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TestComponent
  },{
    path: 'result',
    component: ResultComponent
  }
];
