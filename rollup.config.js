import withSolid from 'rollup-preset-solid';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';

export default withSolid({
    plugins: [
        postcss({
            extract: 'cursor-chat.css',
            minimize: true,
        }),
        babel({ babelHelpers: 'bundled' }),
    ],
});
