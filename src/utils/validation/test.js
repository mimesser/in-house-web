import { isPhoneNumberValid } from '.';

describe.only('validation', () => {
  const validNumbers = [
    '(123) 456-7890',
    '(123)456-7890',
    '123-456-7890',
    '123.456.7890',
    '1234567890',
    '+31636363634',
    '075-63546725',
    '(123)4567890',
  ];

  for (const n of validNumbers) {
    it(`should allow valid phone numbers [${n}]`, () => {
      expect(isPhoneNumberValid(n)).toBe(true);
    });
  }

  const invalidNumbers = ['asd', '123', '123-123'];

  for (const n of invalidNumbers) {
    it(`should not allow invalid phone numbers [${n}]`, () => {
      expect(isPhoneNumberValid(n)).toBe(false);
    });
  }
});
