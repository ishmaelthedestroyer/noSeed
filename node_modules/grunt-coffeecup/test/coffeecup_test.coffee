readFile = (file) ->
  contents = grunt.file.read(file)
  contents = contents.replace(/\r\n/g, "\n")  if process.platform is "win32"
  contents

assertFileEquality = (test, pathToActual, pathToExpected, message) ->
  actual = readFile(pathToActual)
  expected = readFile(pathToExpected)
  test.equal expected, actual, message

grunt = require 'grunt'
fs = require 'fs'
coffee = require '../tasks/coffeecup'

exports.coffee =

  compileDefault: (test) ->
    test.expect 1

    assertFileEquality test,
      "tmp/default/test.html",
      "test/expected/default/test.html",
      "Should compile CoffeeCup to HTML"

    test.done()

  compileVariables: (test) ->
    test.expect 1

    assertFileEquality test,
      "tmp/variables/test.html",
      "test/expected/variables/test.html",
      "Should compile CoffeeCup to HTML with a custom title"

    test.done()

  compileRecursive: (test) ->
    test.expect 2

    assertFileEquality test,
      "tmp/recursive/a/test.html",
      "test/expected/recursive/a/test.html",
      "Should compile all CoffeeCup to HTML in recursive file structure"

    assertFileEquality test,
      "tmp/recursive/b/test.html",
      "test/expected/recursive/b/test.html",
      "Should compile all CoffeeCup to HTML in recursive file structure"
      
    test.done()