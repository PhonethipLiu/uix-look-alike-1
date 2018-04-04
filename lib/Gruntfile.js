module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: ['../js/main.js'],
                dest: '../dist/app.js'
            },
            options: {
                browserifyOptions: {
                paths: ["./node_modules"]
                }
            }
        },
        jshint: {
            files: ['../js/**/*.js'], //location of javascript files
            options: {
                predef: ["document", "console", "alert"], //allows for predefined things not found in js
                esnext: true, //allows for ES6
                globalstrict: true,
                globals: { "$": true }, //name value pairs, allows to define global vars used in many files.
                browserify: true
            }
        },
        sass: { //setup sass compilation
            dist: {
                files: {
                    '../css/main.css': '../scss/main.scss'
                }
            }
        },
        watch: { //automatically watch for changes
            options: {
                livereload: true,
              },
              javascripts: {
                files: ['./js/**/*.js'],
                tasks: ['jshint', 'browserify']
              },
              sass: {
                files: ['./sass/**/*.sass'],
                tasks: ['sass']
              },
              hbs: {
                files: ['./templates/**/*.hbs'],
                tasks: ['browserify']
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};
