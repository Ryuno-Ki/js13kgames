module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

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
                    'build/<%= pkg.name %>.min.css': [
                        'src/css/*.css'
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
                    'build/switch-closed.svg': 'src/svg/switch-closed.svg'

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
            #     'build/<%= pkg.name %>.min.js'
            # ]
            options:
                jshintrc: true

        maxFilesize:
            app:
                options:
                    maxBytes: 13312
                src: [
                    'index.html'
                    'build/js13k-breaker-panel.min.css'
                    'build/js13k-breaker-panel.min.js'
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
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +\
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: true
                files:
                    'build/<%= pkg.name %>.min.js': [
                        'src/js/utils.js'
                        'src/js/pubsub.js'
                        'src/js/errors.js'
                        'src/js/svg.js'
                        'src/js/element.js'
                        'src/js/modules.js'
                        'src/js/<%= pkg.name %>.js'
                    ]

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
                    'mocha-chai-sinon'
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
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
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
        'cssmin'
        'imagemin'
        'uglify'
        'maxFilesize'
        'watch'
    ]
    grunt.registerTask 'test', ['mocha-chai-sinon']
