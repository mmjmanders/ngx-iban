import { IbanPipe } from './iban.pipe';

describe('IbanPipe', () => {
  let pipe: IbanPipe;

  beforeEach(() => {
    pipe = new IbanPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it.each([
    {
      input: 'GB82WEST12345698765432',
      output: 'GB82 WEST 1234 5698 7654 32',
      separator: undefined,
    },
    {
      input: 'GB82WEST12345698765432',
      output: 'GB82-WEST-1234-5698-7654-32',
      separator: '-',
    },
    { input: '', output: null, separator: undefined },
    { input: null, output: null, separator: undefined },
  ])(
    'should convert $input to $output with separator $separator',
    ({ input, output, separator }) => {
      const result = pipe.transform(input, separator);
      expect(result).toEqual(output);
    }
  );
});
