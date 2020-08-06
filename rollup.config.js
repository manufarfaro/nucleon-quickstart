import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import html, { makeHtmlAttributes } from '@rollup/plugin-html'
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const isProduction = process.env.NODE_ENV === 'production';

const scriptExtensions = ['.tsx', '.ts', '.jsx', '.js'];
const styleExtensions = ['.css'];

const htmlTemplate = async ({ attributes, files, meta, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const metas = (meta || [])
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `
    <!doctype html>
    <html${makeHtmlAttributes(attributes.html)}>
      <head>
        ${metas}
        <title>${title}</title>
      </head>
      <body>
        <div id="root"></div>
        ${scripts}
      </body>
    </html>
  `;
};

const rollupConfig = {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    resolve({
      extensions: scriptExtensions
    }),
    commonjs({
      include: '**/node_modules/**',
    }),
    babel({
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      extensions: scriptExtensions
    }),
    html({
      template: htmlTemplate,
    }),
    isProduction && terser(),
    postcss({
      extensions: styleExtensions,
      plugins: []
    })
  ]
};

export default rollupConfig;
