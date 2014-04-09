#
# grunt-coffeecup
# https://github.com/namuol/grunt-coffeecup
#
# Copyright (c) 2013 Louis Acresti
# Licensed under the MIT license.
# 
module.exports = (grunt) ->
  path = require("path")
  _ = grunt.util._
  grunt.registerMultiTask "coffeecup", "Compile CoffeeCup files into HTML", ->
    options = @options(
      join: false
      separator: grunt.util.linefeed
    )

    grunt.verbose.writeflags options, "Options"

    @files.forEach (f) ->
      validFiles = removeInvalidFiles(f)
      output = undefined
      
      # get all extensions for input files
      ext = validFiles.map((f) ->
        path.extname f
      )

      if options.join is true
        if _.uniq(ext).length > 1
          grunt.fail.warn "Join options requires input files share the same extension (found " + _.uniq(ext).join(", ") + ")."
        else
          output = concatInput(validFiles, options)
      else
        output = concatOutput(validFiles, options)
      if output.length < 1
        grunt.log.warn "Destination not written because compiled files were empty."
      else
        grunt.file.write f.dest, output
        grunt.log.writeln "File " + f.dest + " created."

  removeInvalidFiles = (files) ->
    files.src.filter (filepath) ->
      if not grunt.file.exists(filepath)
        grunt.log.warn "Source file \"" + filepath + "\" not found."
        false
      else
        true

  concatInput = (files, options) ->
    code = files.map((filePath) ->
      grunt.file.read filePath
    ).join(grunt.util.normalizelf(options.separator))
    compileCoffeeCup code, options

  concatOutput = (files, options) ->
    files.map((filepath) ->
      code = grunt.file.read(filepath)
      compileCoffeeCup code, options, filepath
    ).join grunt.util.normalizelf(options.separator)

  compileCoffeeCup = (code, options, filepath) ->
    options = _.clone(options)
    if filepath
      options.filename = filepath
    try
      return require("coffeecup").render(code, options)
    catch e
      grunt.log.error e
      grunt.fail.warn "CoffeeCup failed to render."