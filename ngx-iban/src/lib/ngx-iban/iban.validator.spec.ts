import { isValidIBAN } from './iban.validator';

describe('IbanValidator', () => {
  it.each([
    { iban: 'GB82WEST12345698765432', countryCode: undefined, valid: true },
    { iban: 'GB82WEST12345698765431', countryCode: undefined, valid: false },
    { iban: 'GB82WEST12345698765432', countryCode: 'GB', valid: true },
    { iban: 'GB82WEST12345698765432', countryCode: 'NL', valid: false },
    { iban: 'GB82 WEST 1234 5698 7654 32', countryCode: 'GB', valid: true },
    { iban: 'gb82 west 1234 5698 7654 32', countryCode: 'GB', valid: true },
  ])(
    'validate should return $valid for $iban with country code $countryCode',
    ({ iban, countryCode, valid }) => {
      expect(isValidIBAN(iban, countryCode)).toBe(valid);
    }
  );
});
