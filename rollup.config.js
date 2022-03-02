import withSolid from 'rollup-preset-solid';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';

export default withSolid({
    plugins: [
        postcss({
            plugins: [
                autoprefixer(),
                cssnano({
                    preset: 'default',
                }),
                postcssImport(),
            ],
            inject: false,
            include: '**/xinghuang.css',
            extract: 'xinghuang.css',
        }),
        postcss({
            plugins: [
                autoprefixer(),
                cssnano({
                    preset: 'default',
                }),
                postcssImport(),
            ],
            inject: false,
            include: '**/maolv.css',
            extract: 'maolv.css',
        }),
        babel({ babelHelpers: 'bundled' }),
    ],
});
