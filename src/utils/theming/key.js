import { prop } from './prop';
import theme from '../../theme';

/**
 * Returns value of `props.theme[path]` or `styledTheme[path]`
 */
export const key = (path, defaultValue) => (props = {}) => prop(path, prop(path, defaultValue)(theme))(props.theme);
