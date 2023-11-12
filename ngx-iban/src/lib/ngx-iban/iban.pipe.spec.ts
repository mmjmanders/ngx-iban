import { IbanPipe } from './iban.pipe';

describe('IbanPipe', () => {
  let pipe: IbanPipe;

  beforeEach(() => {
    pipe = new IbanPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert IBAN to print format', () => {
    const output = pipe.transform('GB82WEST12345698765432');
    expect(output).toEqual('GB82 WEST 1234 5698 7654 32');
  });

  it('should return null when an empty string is given', () => {
    const output = pipe.transform('');
    expect(output).toBeNull();
  });

  it('should return null when null is given', () => {
    const output = pipe.transform(null);
    expect(output).toBeNull();
  });

  it('should convert IBAN to print format with separator', () => {
    const output = pipe.transform('GB82WEST12345698765432', '-');
    expect(output).toEqual('GB82-WEST-1234-5698-7654-32');
  });
});
