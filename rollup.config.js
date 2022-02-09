import withSolid from 'rollup-preset-solid';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-import-css';

export default withSolid({
    output: { file: "dist/esm/index.js", format: "esm" },
    plugins: [babel({ babelHelpers: 'bundled' }), css()],
});
