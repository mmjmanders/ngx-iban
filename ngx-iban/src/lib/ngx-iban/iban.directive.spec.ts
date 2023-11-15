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

  it('should yield valid using countryCode', () => {
    directive.countryCode = 'NL';
    expect(
      directive.validate(new UntypedFormControl('NL42TEST0519098218'))
    ).toBeNull();
  });

  it('should yield invalid using countryCode', () => {
    directive.countryCode = 'DE';
    expect(
      directive.validate(new UntypedFormControl('NL42TEST0519098218'))
    ).toBeTruthy();
  });

  it('should yield valid when no value is provided', () => {
    expect(directive.validate(new UntypedFormControl())).toBeNull();
  });

  it.each([
    { input: 'NL42TEST0519098218' },
    { input: 'nl42test0519098218' },
    { input: 'nL42tEsT0519098218' },
  ])('should yield valid for $input', ({ input }) => {
    const formControl = new UntypedFormControl(input);
    expect(directive.validate(formControl)).toBeNull();
  });

  it('should yield invalid for invalid IBAN', () => {
    const input = new UntypedFormControl('NL42TEST0519098217');
    expect(directive.validate(input)).toBeTruthy();
  });
});
