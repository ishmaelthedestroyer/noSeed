#
# grunt-coffeecup
# https://github.com/namuol/grunt-coffeecup
# 
# Copyright (c) 2013 Louis Acresti
# Licensed under the MIT license.
# 
module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    # Before generating any new files, remove any previously-created files.
    clean:
      tests: ["tmp"]
    
    # Configuration to be run (and then tested).
    coffeecup:
      default_options:
        files:
          'tmp/default/test.html': 'test/fixtures/default/test.coffee'
      with_variables:
        options:
          title: 'wat'
        files:
          "tmp/variables/test.html": "test/fixtures/variables/test.coffee"
      recursive:
        expand: true
        cwd: 'test/fixtures/recursive'
        src: ['**/*.coffee']
        dest: 'tmp/recursive'
        ext: '.html'

    # Unit tests.
    nodeunit:
      tests: ["test/*_test.coffee"]
  
  # Actually load this plugin's task(s).
  grunt.loadTasks "tasks"
  
  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-nodeunit"
  
  # Whenever the "test" task is run, first clean the "tmp" dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask "test", ["clean", "coffeecup", "nodeunit"]
  
  # By default, lint and run all tests.
  grunt.registerTask "default", ["test"]