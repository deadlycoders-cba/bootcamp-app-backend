import { validateEmail } from './validateEmail.js';

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('jordan@example.com')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(validateEmail('jordanexample.com')).toBe(false);
  });
});