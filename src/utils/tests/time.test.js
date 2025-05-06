import formatEpochToDate from '../time';

describe('formatEpochToDate', () => {
  it('formats a known epoch timestamp correctly', () => {
    // January 1, 2000 at 15:45 UTC
    const epoch = new Date('2000-01-01T15:45:00Z').getTime();
    const formatted = formatEpochToDate(epoch);

    // Result depends on local time zone. We will test for valid format parts.
    expect(formatted).toMatch(/\b\d{2}:\d{2}\s[AP]M\b/); // e.g., 03:45 PM
    expect(formatted).toMatch(/\bJan\b/); // Month
    expect(formatted).toMatch(/\b01\b/); // Day
    expect(formatted).toMatch(/\b00\b/); // Year (short format)
  });

  it('formats current time correctly', () => {
    const now = Date.now();
    const formatted = formatEpochToDate(now);

    expect(typeof formatted).toBe('string');
    expect(formatted).toMatch(/\b\d{2}:\d{2}\s[AP]M\b/);
  });

  it('handles string epoch inputs', () => {
    const epochString = `${new Date('2023-05-06T08:30:00Z').getTime()}`;
    const formatted = formatEpochToDate(epochString);

    expect(typeof formatted).toBe('string');
    expect(formatted).toMatch(/\bMay\b/);
  });

  it('returns "Invalid Date" for bad input', () => {
    const result = formatEpochToDate('not-a-valid-date');
    expect(result).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for undefined input', () => {
    const result = formatEpochToDate(undefined);
    expect(result).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for null input', () => {
    const result = formatEpochToDate(null);
    expect(result).toBe('Invalid Date');
  });
});
