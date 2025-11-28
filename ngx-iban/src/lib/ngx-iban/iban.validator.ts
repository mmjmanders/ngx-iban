import { isValidIBAN as _isValidIBAN, electronicFormatIBAN } from 'ibantools';

export const isValidIBAN: (iban: string, countryCode?: string) => boolean = (
  iban,
  countryCode
) =>
  countryCode
    ? new RegExp(`^${countryCode}.*$`, 'i').test(iban) &&
      _isValidIBAN(electronicFormatIBAN(iban) as string)
    : _isValidIBAN(electronicFormatIBAN(iban) as string);
