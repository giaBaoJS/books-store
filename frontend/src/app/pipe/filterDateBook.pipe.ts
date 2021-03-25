import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'filterDatepipe',
})
export class FilterDatepipe {
  pipe = new DatePipe('en-US');
  date = Date.now();
  constructor(public datepipe: DatePipe) {}
  transform(objects: any[]): any[] {
    if (objects) {
      var trans = objects.map((object) =>
        this.pipe.transform(object.createAt, 'medium')
      );
      return trans;
    //   return trans.filter((value) => {
    //     this.date - value.createAt > 3;
    //   });
    }
  }
}
