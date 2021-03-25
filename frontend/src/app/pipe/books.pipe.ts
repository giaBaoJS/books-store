import { Pipe } from '@angular/core';

@Pipe({
  name: 'bookspipe',
})
export class BooksPipe {
  transform(objects: any[]): any[] {
    if (objects) {
      return objects.filter((object) => {
        return object.like > 10;
      });
    }
  }
}
