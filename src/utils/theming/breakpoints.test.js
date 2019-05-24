import { breakpoints } from './breakpoints';
import theme from '../../theme';

describe('breakpoints', () => {
   const theme2 = { breakpoints: { foo: 'bar' } };

   it('returns value from theme when no anotherTheme was passed in', () => {
      expect(breakpoints('sm')()).toBe(theme.breakpoints.sm);
   });

   it('returns value from anotherTheme when passed in', () => {
      expect(breakpoints('foo')({ theme: theme2 })).toBe(theme2.breakpoints.foo);
   });

   it('returns defaultValue', () => {
      expect(breakpoints('foo', 'baz')()).toBe('baz');
   });
});
