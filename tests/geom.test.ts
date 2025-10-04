import { describe, it, expect } from 'vitest';
import * as lib from '../scripts/_library';

describe('_library.Geom Static Methods', () => {
  it('Validate distTo()', () => {
    expect(lib.Geom.distTo(0, 0, 0, 5)).to.equal(5); 
    expect(lib.Geom.distTo(0, 0, 0, -5)).to.equal(5);       // negative should be ignored
    expect(lib.Geom.distTo(0, 0, 5, 0)).to.equal(5); 
    expect(lib.Geom.distTo(0, 0, -5, 0)).to.equal(5);       // negative should be ignored
    expect(lib.Geom.distTo(0, 0, 3, 4)).to.equal(5); 
    expect(lib.Geom.distTo(1, 1, 4, 5)).to.equal(5); 
    expect(lib.Geom.distTo(0, 0, 0, 0)).to.equal(0); 
    expect(lib.Geom.distTo(2, 3, 2, 3)).to.equal(0); 
    expect(lib.Geom.distTo(-3, -4, 0, 0)).to.equal(5);      // negative should be ignored
    expect(lib.Geom.distTo(-1, -1, -4, -5)).to.equal(5);    // negative should be ignored
    expect(lib.Geom.distTo(3, 4, -3, -4)).to.equal(0);      // negative should be ignored
    expect(lib.Geom.distTo(-2, 2, 2, -2)).to.equal(0);      // negative should be ignored
  });


  it('Validate stepsTo()', () => {
    expect(lib.Geom.stepsTo(0, 0, 5, 0)).to.equal(5); 
    expect(lib.Geom.stepsTo(0, 0, -5, 0)).to.equal(5);      // negative should be ignored
    expect(lib.Geom.stepsTo(0, 0, 0, 5)).to.equal(5); 
    expect(lib.Geom.stepsTo(0, 0, 0, -5)).to.equal(5);      // negative should be ignored
    expect(lib.Geom.stepsTo(0, 0, 3, 4)).to.equal(7); 
    expect(lib.Geom.stepsTo(1, 1, 4, 5)).to.equal(7); 
    expect(lib.Geom.stepsTo(0, 0, 0, 0)).to.equal(0); 
    expect(lib.Geom.stepsTo(2, 3, 2, 3)).to.equal(0); 
    expect(lib.Geom.stepsTo(-3, -4, 0, 0)).to.equal(7);     // negative should be ignored
    expect(lib.Geom.stepsTo(-1, -1, -4, -5)).to.equal(7);   // negative should be ignored
    expect(lib.Geom.stepsTo(3, 4, -3, -5)).to.equal(1);     // negative should be ignored
    expect(lib.Geom.stepsTo(-2, 2, 2, -2)).to.equal(0);     // negative should be ignored
  });


});



