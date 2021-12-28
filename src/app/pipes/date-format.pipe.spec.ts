import * as moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format a date', ()=>{
    const pipe = new DateFormatPipe();
    const date = new Date();
    const dateFormat = "mm-dd-yyyy";

    let dateMapped = moment(date.toDateString()).format(dateFormat);
    expect(pipe.transform(date.toDateString(), dateFormat)).toEqual(dateMapped);
  })
});
