'use strict';

var expect    = require('expect.js'),
    isFile    = require('./util/is-file'),
    rimraf    = require('rimraf'),
    fs        = require('fs'),
    automaton = require('automaton').create(),
    init      = require('../autofile')
;

describe('init', function () {
    var target =  __dirname + '/tmp/';

    function clean(done) {
        rimraf(target, done);
    }

    beforeEach(function (done) {
        clean(function (err) {
            if (err) {
                throw err;
            }

            fs.mkdirSync(target);
            done();
        });
    });
    after(clean);

    it('should initialize an empty task - with default autofile name', function (done) {
        var filename = 'autofile.js';

        automaton.run(init, {
            dst: target
        }, function (err) {
            if (err) {
                throw err;
            }

            expect(isFile(target + filename)).to.be(true);
            done();
        });

    });

    it('should initialize an empty task - with specific autofile name', function (done) {
        var file = 'autofile_test.js';

        automaton.run(init, {
            name: file,
            dst: target
        }, function (err) {
            if (err) {
                throw err;
            }

            expect(isFile(target + file)).to.be(true);
            done();
        });
    });

    it('should throw an error if the autofile already exists', function (done) {
        var file = 'autofile_exists.js';

        // create file
        fs.writeFileSync(target + file, 'dummy');

        automaton.run('init', {
            name: file,
            dst: target
        }, function (err) {
            expect(err !== null).to.be(true);
            done();
        });
    });
});