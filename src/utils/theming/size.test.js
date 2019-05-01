import { size } from './size';
import theme from '../../theme';

describe('size', () => {
   const theme2 = { sizes: { foo: 'bar' } };

   it('returns value from theme when no anotherTheme was passed in', () => {
      expect(size('maxWidth')()).toBe(theme.sizes.maxWidth);
   });

   it('returns value from anotherTheme when passed in', () => {
      expect(size('foo')({ theme: theme2 })).toBe(theme2.sizes.foo);
   });

   it('returns defaultValue', () => {
      expect(size('foo', 'baz')()).toBe('baz');
   });
});
