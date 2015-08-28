module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

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

        uglify:
            build:
                options:
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                files:
                    'build/<%= pkg.name %>.min.js': [
                        'src/*.js'
                    ]

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-max-filesize'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    # Default task(s).
    grunt.registerTask 'default', ['uglify', 'maxFilesize']
    grunt.registerTask 'test', ['mocha-chai-sinon']
