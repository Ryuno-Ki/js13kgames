module.exports = (grunt) ->

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        mocha:
            test:
                options:
                    reporter: 'Spec'
                    run: true
                src: ['tests/**/*.html']

        uglify:
            options:
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            build:
                src: 'src/<%= pkg.name %>.js'
                dest: 'build/<%= pkg.name %>.min.js'

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-mocha'

    # Default task(s).
    grunt.registerTask 'default', ['uglify']
    grunt.registerTask 'test', ['mocha']
