/*jshint es5:true*/

'use strict';

module.exports = function (task) {
    task
    .id('{{name}}')
    .name('{{name}}')
    .author('Task author')

    .option('foo', 'The foo option', 'foo default value')
    .option('bar', 'The bar option', 'bar default value')

    .setup(function (opts, ctx, next) {
        // Code always executed before any "do" statements
        // Do any validation/sanitization you need here
        next();
    })

    .do(function (opts, ctx, next) {
        // Your code goes here
        next();
    })

    .teardown(function (opts, ctx, next) {
        // Code always executed after the execution of all "do" statements
        // or after the task failed
        // Useful to do any cleanup
        next();
    });
};