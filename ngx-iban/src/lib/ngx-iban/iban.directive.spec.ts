import { IbanDirective } from './iban.directive';
import { UntypedFormControl } from '@angular/forms';

describe('IbanDirective', () => {
  let directive: IbanDirective;

  beforeEach(() => {
    directive = new IbanDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should yield valid for valid IBAN', () => {
    const input = new UntypedFormControl('NL42TEST0519098218');
    expect(directive.validate(input)).toBeNull();
  });

  it('should yield valid for valid IBAN all lowercase', () => {
    const input = new UntypedFormControl('nl42test0519098218');
    expect(directive.validate(input)).toBeNull();
  });

  it('should yield valid for valid IBAN mixed case', () => {
    const input = new UntypedFormControl('nL42tEsT0519098218');
    expect(directive.validate(input)).toBeNull();
  });

  it('should yield invalid for invalid IBAN', () => {
    const input = new UntypedFormControl('NL42TEST0519098217');
    expect(directive.validate(input)).toBeTruthy();
  });
});
