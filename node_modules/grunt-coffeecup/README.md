# grunt-coffeecup [![Build Status](https://secure.travis-ci.org/namuol/grunt-coffeecup.png?branch=master)](http://travis-ci.org/namuol/grunt-coffeecup)

Grunt task to compile [CoffeeCup](https://github.com/gradus/coffeecup) into HTML.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

``` shell
npm install grunt-coffeecup --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of CoffeeScript:

```  coffeescript
grunt.loadNpmTasks 'grunt-coffeecup'
```

## The "coffeecup" task
_Run this task with the `grunt coffeecup` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

Any items in the `options` object are passed to CoffeeCup's `render` function.

### Usage Example

``` coffeescript
grunt.initConfig
  # ... other configurations ...
  coffeecup:
    simple:
      files:
        'path/to/result.html': 'path/to/source.coffee'
    recurse:
      expand: true
      cwd: 'path/to'
      src: ['**/*.coffee']
      dest: 'path/to/dest'
      ext: '.html'
    custom_title:
      options:
        title: 'Sweet Title, Bro'
      files:
        'path/to/custom/result.html': 'path/to/custom/source.coffee'
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2013-03-18  v0.1.0  Bare minimum tests pass.
