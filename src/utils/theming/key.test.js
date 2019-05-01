import { key } from './key';
import theme from '../../theme';

describe('key', () => {
   const theme2 = { foo: 'bar' };

   it('returns value from theme when no anotherTheme was passed in', () => {
      expect(key('palette')()).toBe(theme.palette);
   });

   it('returns value from anotherTheme when passed in', () => {
      expect(key('foo')({ theme: theme2 })).toBe(theme2.foo);
   });

   it('returns defaultValue', () => {
      expect(key('foo', 'baz')()).toBe('baz');
   });
});
