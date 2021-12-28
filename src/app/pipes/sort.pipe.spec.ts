import { pipe } from 'rxjs';
import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });
  it('should sort an array', ()=>{
    const pipe = new SortPipe();
    let transformArray = [{fieldA: 0}, {fieldA:2}, {fieldA:1}]
    expect(pipe.transform(transformArray, "fieldA", "")).toEqual([{fieldA: 0}, {fieldA:1}, {fieldA:2}]);
  });
  
  it("should sort an array in reverse order when 'desc' flag provided", ()=>{
    const pipe = new SortPipe();
    let transformArray = [{fieldA: 0}, {fieldA:2}, {fieldA:1}]
    expect(pipe.transform(transformArray, "fieldA", "desc")).toEqual([{fieldA: 2}, {fieldA:1}, {fieldA:0}]);
  })
});
