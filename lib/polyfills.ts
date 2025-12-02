// Polyfills for older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Optional chaining polyfill
if (!Object.prototype.hasOwnProperty.call(Function.prototype, 'bind')) {
  // Add basic polyfills for very old browsers
  console.warn('This browser is very old and may not support all features');
}
