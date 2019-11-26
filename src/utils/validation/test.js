import { isPhoneNumberValid } from '.';

describe.only('validation', () => {
  const validNumbers = [
    '(223) 456-7890',
    '(323)456-7890',
    '423-456-7890',
    '523.456.7890',
    '6234567890',
    '+31636363634',
    '975-63546725',
    '(523)4567890',
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
