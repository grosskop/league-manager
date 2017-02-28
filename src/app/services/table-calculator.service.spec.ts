/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableCalculatorService } from './table-calculator.service';

describe('TableCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableCalculatorService]
    });
  });

  it('should ...', inject([TableCalculatorService], (service: TableCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
