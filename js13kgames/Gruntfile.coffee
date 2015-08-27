module.exports = (grunt) ->

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        "mocha-chai-sinon":
            test:
                options:
                    ui: 'bdd'
                    reporter: 'spec'
                src: ['test/**/*.spec.js']

        uglify:
            options:
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            build:
                src: 'src/<%= pkg.name %>.js'
                dest: 'build/<%= pkg.name %>.min.js'

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    # Default task(s).
    grunt.registerTask 'default', ['uglify']
    grunt.registerTask 'test', ['mocha-chai-sinon']
