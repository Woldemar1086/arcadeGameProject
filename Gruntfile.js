module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                esversion: 6,
                debug: true
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint', 'browserify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            },
            image: {
                files: [
                    'src/images/**/{,*/}*.{png,gif,svg,jpg,jpeg,bmp}'
                ],
                tasks: ['copy']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin']
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.min.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js',
            },
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/images', src: ['**'], dest: 'dist/images' },
                ],
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                beautify: true,
                sourceMap: {
                    includeSources: true,
                    url: "js/<%= pkg.name %>.min.js.map"
                }
            },
            my_target: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.min.js']
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['src/**/*.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'copy',
        'htmlmin',
        'cssmin',
        'browserify',
        'jshint',
        'watch'
    ]);
    grunt.registerTask('build', [
        'copy',
        'htmlmin',
        // 'babel',
        'jshint',
        'browserify',
        'uglify',
        'cssmin'
    ]);
};