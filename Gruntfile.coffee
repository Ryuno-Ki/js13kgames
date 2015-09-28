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
                        'index.html'
                        'game.appcache'
                        'build/require.min.js'
                        'build/app.min.css'
                        'build/app.min.js'
                        'build/app/*.js'
                        'build/app/electronics/*.js'
                    ]
                    dest: '/'
                }]
            file:
                options:
                    archive: 'dist/offline-game.zip'
                files: [{
                    expand: true
                    src: [
                        'index.html'
                        'game.appcache'
                        'build/app.min.css'
                    ]
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
                sourceMap: true
            build:
                files:
                    'build/app.min.css': [
                        'src/css/<%= pkg.name %>.css'
                    ]

        'gh-pages':
            options:
                base: 'build'
            src: [
                'index.html'
                'app.min.css'
                'app.min.js'
                'require.min.js'
                'app/element.js'
                'app/main.js'
                'app/svg.js'
                'app/utils.js'
                'app/electronics/circuitElement.js'
                'app/electronics/consumerElement.js'
                'app/electronics/powerSourceElement.js'
                'app/electronics/switchElement.js'
            ]

        htmlmin:
            build:
                options:
                    removeComments: true
                    collapseWhitespace: true
                files:
                    'index.html': 'game.html'

        jsdoc:
            doc:
                src: [
                    'src/js/*.js'
                    'src/js/electronics/*.js'
                ]
                dest: 'docs/'
                options:
                    readme: 'README.md'

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
                    'target.html': 'game.html'

        uglify:
            build:
                options:
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: true
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
                    'gh-pages'
                    # 'mocha-chai-sinon'
                    # 'maxFilesize'
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
    grunt.loadNpmTasks 'grunt-gh-pages'
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
        'gh-pages'
        'watch'
    ]
    # grunt.registerTask 'test', ['mocha-chai-sinon']
