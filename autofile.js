'use strict';

var fs    = require('fs');
var path  = require('path');

module.exports = function (task) {
    task
    .id('init')
    .name('Init')
    .description('Init an empty autofile.')
    .author('Indigo United')

    .option('name', 'The task name.', 'autofile')
    .option('dst', 'Directory in which the task will be created.', process.cwd())

    .setup(function (opt, ctx, next) {
        var error;

        if (path.extname(opt.name) === '.js') {
            opt.name = opt.name.slice(0, -3);
        }
        opt.filename = path.join(opt.dst, opt.name + '.js');
        opt.__dirname = __dirname;

        fs.stat(opt.filename, function (err) {
            if (!err || err.code !== 'ENOENT') {
                error = new Error('EEXIST, file already exists \'' + opt.filename + '\'');
                error.code = 'EXISTS';
                return next(error);
            }

            next();
        });
    })
    .do('cp', {
        description: null,
        options: {
            files: {
                '{{__dirname}}/base_autofile.js': '{{filename}}'
            }
        }
    })
    .do('scaffolding-replace', {
        description: null,
        options: {
            files: '{{filename}}',
            data: {
                name: '{{name}}'
            }
        }
    });
};