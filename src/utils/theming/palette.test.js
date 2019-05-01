import { palette } from './palette';
import theme from '../../theme';

describe('palette', () => {
   const theme2 = { palette: { foo: ['bar', 'baz'] }, reversePalette: { foo: ['baz', 'bar'] } };

   it('throws when no index was passed in', () => {
      expect(() => palette()({ theme: theme2, palette: 'primary' })).toThrow();
   });

   it('throws when no palette was passed in', () => {
      expect(() => palette(0)({ theme: theme2 })).toThrow();
   });

   it('returns palette at index when palette was passed in with props', () => {
      expect(palette(0)({ theme: theme2, palette: 'primary' })).toBe(theme.palette.primary[0]);
      expect(palette(0)({ theme: theme2, palette: 'foo' })).toBe(theme2.palette.foo[0]);
      expect(palette(0)({ theme: theme2, palette: 'danger', reverse: true })).toBe(theme.reversePalette.danger[0]);
   });

   it('returns palette at index when palette was passed in with args ignoring props', () => {
      expect(palette('danger', 1)()).toBe(theme.palette.danger[1]);
      expect(palette('danger', 1)({ theme: theme2 })).toBe(theme.palette.danger[1]);
      expect(palette('danger', 1)({ theme: theme2, palette: 'foo' })).toBe(theme.palette.danger[1]);
      expect(palette('danger', 1)({ theme: theme2, reverse: true })).toBe(theme.reversePalette.danger[1]);
   });

   it('returns palette at proper index when exception was passed in', () => {
      expect(palette(1, { danger: 0 })({ theme: theme2, palette: 'foo' })).toBe(theme2.palette.foo[1]);
      expect(palette(1, { danger: 0 })({ theme: theme2, palette: 'danger' })).toBe(theme.palette.danger[0]);
   });

   it('returns reverse palette when true argument is passed in', () => {
      expect(palette(1, true)({ theme: theme2, palette: 'foo' })).toBe(theme2.reversePalette.foo[1]);
      expect(palette(1, true)({ theme: theme2, palette: 'foo', reverse: true })).toBe(theme2.palette.foo[1]);
      expect(palette(1, true)({ theme: theme2, palette: 'danger' })).toBe(theme.reversePalette.danger[1]);
   });

   it('returns defaultValue', () => {
      expect(palette('foo', 1, 'red')()).toBe('red');
      expect(palette('foo', 1, 'red')({ theme: theme2 })).toBe(theme2.palette.foo[1]);
   });
});
