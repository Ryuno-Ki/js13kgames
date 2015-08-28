module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        cssmin:
            options:
                sourceMap: true
            build:
                files:
                    'build/<%= pkg.name %>.min.css': [
                        'src/*.css'
                    ]

        imagemin:
            build:
                options:
                    optimizationLevel: 3
                    svgoPlugins: [
                        {removeViewBox: false}
                        {removeUselessStrokeAndFill: false}
                        {removeEmptyAttrs: false}
                    ]
                files:
                    'build/img.svg': 'src/img.svg'

        jsdoc:
            doc:
                src: [
                    'src/*.js'
                ]
                dest: 'docs/'
                options:
                    readme: 'docs/README.md'

        jshint:
            beforeconcat: [
                'src/*.js'
            ]
            afterconcat: [
                'build/<%= pkg.name %>.min.js'
            ]
            options:
                jshintrc: true

        maxFilesize:
            app:
                options:
                    maxBytes: 13312
                src: ['build/js13k-breaker-panel.min.js']

        "mocha-chai-sinon":
            test:
                options:
                    ui: 'bdd'
                    reporter: 'spec'
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
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                files:
                    'build/<%= pkg.name %>.min.js': [
                        'src/*.js'
                    ]

        watch:
            scripts:
                files: [
                    'src/*.js'
                ]
                tasks: [
                    'doc'
                ]

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-jsdoc'
    grunt.loadNpmTasks 'grunt-max-filesize'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'
    grunt.loadNpmTasks 'grunt-notify'
    grunt.loadNpmTasks 'grunt-processhtml'

    # Default task(s).
    grunt.registerTask 'default', ['uglify', 'maxFilesize']
    grunt.registerTask 'test', ['mocha-chai-sinon']
