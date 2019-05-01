import { font } from './font';
import theme from '../../theme';

describe('font', () => {
   const theme2 = { fonts: { foo: 'bar', pre: 'test' } };

   it('returns default font when no anotherTheme was passed in', () => {
      expect(font('primary')()).toBe(theme.fonts.primary);
   });

   it('returns default font when it does not exist on anotherTheme', () => {
      expect(font('primary')({ theme: theme2 })).toBe(theme.fonts.primary);
      expect(font('quote')({ theme: theme2 })).toBe(theme.fonts.quote);
   });

   it('returns anotherTheme font when it exists', () => {
      expect(font('foo')({ theme: theme2 })).toBe(theme2.fonts.foo);
      expect(font('pre')({ theme: theme2 })).toBe(theme2.fonts.pre);
   });

   it('returns defaultValue', () => {
      expect(font('foo', 'baz')()).toBe('baz');
   });
});
