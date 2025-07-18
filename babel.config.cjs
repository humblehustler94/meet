/* A Recommended Modern Improvement*
/* This version you don't need to import React from 'react' anymore -- removes boilerplate code. */
/* The key difference is { runtime: 'automatic'} option. 
This enables the New JSX Transform, which has been the standard for React projects since React 17 */

module.exports = {
  presets: [
    '@babel/preset-env',
    // Add the { runtime: 'automatic' } option
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};

/* Step 3: CF Create a Babel Configuration ---> old version */
/*module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
};
*/