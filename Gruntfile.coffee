module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        compress:
            main:
                options:
                    archive: 'dist/game.zip'
                files: [{
                    expand: true
                    src: [
                        'build/index.html'
                        'build/manifest.webapp'
                        'build/game.appcache'
                        'build/*.css'
                        'build/*.js'
                        'build/app/*.js'
                        'build/app/electronics/*.js'
                    ]
                    dest: '/'
                }]

        csscomb:
            sort:
                files:
                    'build/<%= pkg.name %>.sorted.css': [
                        'src/css/*.css'
                    ]
                options:
                    config: '.csscomb.json'

        cssmin:
            options:
                sourceMap: false
            build:
                files:
                    'build/app.min.css': [
                        'src/css/<%= pkg.name %>.css'
                    ]

        htmlmin:
            build:
                options:
                    removeComments: true
                    collapseWhitespace: true
                files:
                    'build/index.html': 'index.html'

        jsdoc:
            doc:
                src: [
                    'src/js/*.js'
                ]
                dest: 'docs/'
                options:
                    readme: 'docs/README.md'

        jshint:
            beforeconcat: [
                'src/js/*.js'
            ]
            # afterconcat: [
            #     'build/app.min.js'
            # ]
            options:
                jshintrc: true

        maxFilesize:
            app:
                options:
                    maxBytes: 13312
                src: [
                    'dist/game.zip'
                ]

        "mocha-chai-sinon":
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['test/**/*.spec.js']

        processhtml:
            options:
                data:
                    variable: '42'
            dist:
                files:
                    'target.html': 'src.html'

        uglify:
            build:
                options:
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: false
                files:
                    'build/app.min.js': [ 'src/app.js' ]
                    'build/app/element.js': [ 'src/js/element.js' ]
                    'build/app/electronics/consumerElement.js': [ 'src/js/electronics/consumerElement.js' ]
                    'build/app/electronics/powerSourceElement.js': [ 'src/js/electronics/powerSourceElement.js' ]
                    'build/app/electronics/switchElement.js': [ 'src/js/electronics/switchElement.js' ]
                    'build/app/electronics/circuitElement.js': [ 'src/js/electronics/circuitElement.js' ]
                    'build/app/main.js': [ 'src/js/main.js' ]
                    'build/app/svg.js': [ 'src/js/svg.js' ]
                    'build/app/utils.js': [ 'src/js/utils.js' ]

        watch:
            scripts:
                files: [
                    'src/js/*.js'
                    'src/css/*.css'
                ]
                tasks: [
                    'cssmin'
                    'uglify'
                    'jshint'
                    # 'mocha-chai-sinon'
                    'maxFilesize'
                ]
            test:
                files: [
                    'test/**/*.spec.js'
                ]
                tasks: [
                    'mocha-chai-sinon'
                ]

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-compress'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-csscomb'
    grunt.loadNpmTasks 'grunt-fxos'
    grunt.loadNpmTasks 'grunt-jsdoc'
    grunt.loadNpmTasks 'grunt-max-filesize'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'
    grunt.loadNpmTasks 'grunt-notify'
    grunt.loadNpmTasks 'grunt-processhtml'

    # Default task(s).
    grunt.registerTask 'default', [
        'htmlmin'
        'cssmin'
        'uglify'
        'compress'
        'maxFilesize'
        'watch'
    ]
    # grunt.registerTask 'test', ['mocha-chai-sinon']
