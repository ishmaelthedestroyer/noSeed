module.exports = function(grunt) {
  var file, fileConfig, taskConfig, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
  require('load-grunt-tasks')(grunt);
  fileConfig = {
    dir: {
      tmp: 'tmp/',
      dist: 'dist/'
    },
    dist: {
      client: 'dist/public/assets/js/app.js',
      css: 'dist/public/assets/css/app.css'
    },
    files: {
      mock: ['mockup/*', 'mockup/**/*'],
      ssl: ['config/ssl/**'],
      lib: ['lib/GeoLiteCity.dat'],
      meta: ['Procfile', 'TODO.md', 'bower.json', 'package.json', '.bowerrc', '.gitignore', '.nodemonignore', 'public/robots.txt', 'public/humans.txt'],
      server: ['*.*', 'lib/*.*', 'app/bin/*.*', 'app/models/*.*', 'app/controllers/*.*', 'config/**/*.*', '!Procfile', '!TODO.md', '!bower.json', '!package.json', '!.bowerrc', '!.gitignore', '!.nodemonignore', '!public/robots.txt', '!public/humans.txt'],
      client: ['public/assets/js/app.*', 'public/assets/js/routes.*', 'public/assets/js/**/*.*', 'public/routes/**/state.*', 'public/routes/**/controllers/*.*', 'public/routes/**/directives/*.*', 'public/routes/**/services/*.*', 'public/routes/**/filters/*.*', 'public/assets/js/bootstrap.*'],
      html: ['public/index.html', 'public/routes/**/**/*.html'],
      css: ['public/assets/css/app.css'],
      favicon: ['public/favicon.ico'],
      img: ['public/assets/img/**'],
      fonts: ['public/assets/fonts/**'],
      vendor: 'public/assets/vendor/**',
      all: [],
      clientTmp: []
    }
  };
  _ref = fileConfig.files.client;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    file = _ref[_i];
    fileConfig.files.clientTmp.push('tmp/' + file);
  }
  _ref1 = fileConfig.files.server;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    file = _ref1[_j];
    fileConfig.files.all.push(file);
  }
  _ref2 = fileConfig.files.client;
  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
    file = _ref2[_k];
    fileConfig.files.all.push(file);
  }
  _ref3 = fileConfig.files.html;
  for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
    file = _ref3[_l];
    fileConfig.files.all.push(file);
  }
  _ref4 = fileConfig.files.css;
  for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
    file = _ref4[_m];
    fileConfig.files.all.push(file);
  }
  taskConfig = {
    pkg: grunt.file.readJSON('package.json'),
    meta: '/** \n' + ' * <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * <%= pkg.homepage %> \n' + ' * \n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' + '<%= pkg.author %>\n' + ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' + ' * */\n',
    concurrent: {
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['watch', 'nodemon:dev']
      }
    },
    nodemon: {
      dev: {
        script: '<%= dir.dist %>app.js',
        options: {
          watch: ['<%= files.server %>'],
          ignore: ['<%= dir.dist %>', '<%= dir.tmp %>']
        }
      }
    },
    watch: {
      server: {
        files: ['<%= files.server %>'],
        tasks: ['build:server']
      },
      client: {
        files: ['<%= files.client %>'],
        tasks: ['build:client']
      },
      html: {
        files: ['<%= files.html %>'],
        tasks: ['build:html']
      },
      css: {
        tasks: ['build:css'],
        files: ['<%= files.css %>']
      },
      assets: {
        tasks: ['build:assets'],
        files: ['<%= files.img %>', '<%= files.favicon %>', '<%= files.vendor %>']
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: true,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },
    clean: {
      tmp: ['<%= dir.tmp %>'],
      dist: {
        expand: true,
        cwd: '<%= dir.dist %>',
        src: ['**/*', '!.git']
      },
      server: {
        cwd: '<%= dir.dist %>',
        src: ['<%= files.server %>'],
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'js';
        }
      },
      meta: {
        expand: true,
        cwd: '<%= dir.dist %>',
        src: ['<%= files.meta %>']
      },
      client: {
        src: ['<%= dist.client %>']
      },
      html: {
        expand: true,
        cwd: '<%= dir.dist %>',
        src: ['<%= files.html %>'],
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'html';
        }
      },
      css: {
        src: ['<%= dist.css %>']
      },
      assets: {
        src: ['<%= dir.dist %>public/assets/fonts/', '<%= dir.dist %>public/assets/img/', '<%= dir.dist %>public/favicon.ico']
      }
    },
    mkdir: {
      tmp: {
        options: {
          create: ['dist/tmp']
        }
      }
    },
    copy: {
      mock: {
        files: [
          {
            src: ['<%= files.mock %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      lib: {
        files: [
          {
            src: ['<%= files.lib %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      meta: {
        files: [
          {
            src: ['<%= files.meta %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      html: {
        expand: true,
        cwd: '.',
        src: ['<%= files.html %>'],
        dest: '<%= dir.dist %>'
      },
      ssl: {
        files: [
          {
            src: ['<%= files.ssl %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      img: {
        files: [
          {
            src: ['<%= files.img %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true,
            flatten: false
          }
        ]
      },
      favicon: {
        files: [
          {
            src: ['<%= files.favicon %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true,
            flatten: false
          }
        ]
      },
      fonts: {
        files: [
          {
            src: ['<%= files.fonts %>'],
            dest: '<%= dir.dist %>',
            cwd: '.',
            expand: true,
            flatten: false
          }
        ]
      },
      vendor: {
        expand: true,
        cwd: '.',
        src: ['<%= files.vendor %>'],
        dest: '<%= dir.dist %>'
      }
    },
    recess: {
      app: {
        src: ['<%= files.css %>'],
        dest: '<%= dist.css %>',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      },
      dist: {
        src: ['<%= dist.css %>'],
        dest: '<%= dist.css %>',
        options: {
          compile: true,
          compress: true,
          prefixWhitespace: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      }
    },
    todos: {
      src: {
        options: {
          priorities: {
            low: /TODO/,
            med: /FIXME/,
            high: null
          },
          reporter: {
            header: function() {
              return '-- BEGIN TASK LIST --\n\n';
            },
            fileTasks: function(file, tasks, options) {
              var result;
              if (!tasks.length) {
                return '';
              }
              result = '';
              result += '* ' + file + '\n';
              tasks.forEach(function(task) {
                return result += '[' + task.lineNumber + ' - ' + task.priority + '] ' + task.line.trim() + '\n';
              });
              return result += '\n\n';
            },
            footer: function() {
              return '-- END TASK LIST --\n';
            }
          }
        },
        files: {
          'TODO.md': ['<%= files.server %>', '<%= files.client %>', '<%= files.meta %>', '<%= files.html %>', '<%= files.css %>', '!TODO.md']
        }
      }
    },
    coffeelint: {
      gruntfile: {
        files: {
          src: ['Gruntfile.coffee']
        }
      },
      server: {
        src: ['<%= files.server %>'],
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'coffee';
        }
      },
      client: {
        src: ['<%= files.client %>'],
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'coffee';
        }
      }
    },
    coffee: {
      server: {
        options: {
          bare: true
        },
        expand: true,
        cwd: '.',
        src: ['<%= files.server %>'],
        dest: '<%= dir.dist %>',
        ext: '.js',
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'coffee';
        }
      },
      client: {
        options: {
          bare: true
        },
        expand: true,
        cwd: '.',
        src: ['<%= files.client %>'],
        dest: '<%= dir.tmp %>',
        ext: '.js',
        filter: function(filename) {
          var ext, split;
          split = filename.split('.');
          ext = split[split.length - 1];
          return ext === 'coffee';
        }
      }
    },
    /*
    uglify:
      app:
        options:
          banner: '/* <%= meta %> '
        files:
          '<%= dir.dist %>public/assets/js/app.js': [
            '<%= dist.client %>'
          ]
    */

    uglify: {
      app: {
        options: {
          banner: '<%= meta %>'
        },
        files: {
          '<%= dir.dist %>public/assets/js/app.js': ['<%= dir.dist %>public/assets/js/app.js']
        }
      },
      templates: {
        files: {
          'public/assets/vendor/angular-templates/templates.min.js': ['public/assets/vendor/angular-templates/templates.js']
        }
      }
    },
    concat: {
      client: {
        options: {
          stripBanners: true,
          banner: '<%= meta %>'
        },
        src: ['<%= files.clientTmp %>'],
        dest: '<%= dist.client %>',
        filter: 'isFile'
      }
    },
    useminPrepare: {
      html: 'public/index.html',
      options: {
        root: '<%= dir.dist %>public',
        dest: '<%= dir.dist %>public',
        flow: {
          steps: {
            js: ['concat'],
            css: ['concat']
          },
          post: {}
        }
      }
    },
    rev: {
      files: {
        src: ['<%= dir.dist %>public/assets/js/*.js', '<%= dir.dist %>public/assets/css/*.css']
      }
    },
    ngtemplates: {
      app: {
        src: ['public/index.html', 'public/routes/**/**/*.html'],
        dest: 'public/assets/vendor/angular-templates/templates.js',
        options: {
          module: 'App',
          htmlmin: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          }
        }
      }
    },
    usemin: {
      html: '<%= dir.dist %>public/index.html'
    }
  };
  grunt.initConfig(grunt.util._.extend(taskConfig, fileConfig));
  grunt.registerTask('default', ['concurrent:dev']);
  grunt.registerTask('minTask', ['useminPrepare', 'coffee:client', 'concat:client', 'uglify:app', 'concat:generated', 'recess:dist', 'rev', 'usemin']);
  grunt.registerTask('build:server', ['clean:server', 'coffeelint:server', 'coffee:server', 'copy:meta', 'copy:lib', 'copy:ssl', 'copy:mock']);
  grunt.registerTask('build:client', ['clean:client', 'coffeelint:client', 'coffee:client', 'concat:client', 'clean:tmp', 'mkdir:tmp']);
  grunt.registerTask('build:html', ['clean:html', 'copy:html']);
  grunt.registerTask('build:css', ['clean:css', 'recess:app']);
  grunt.registerTask('build:assets', ['clean:assets', 'copy:vendor', 'copy:img', 'copy:favicon', 'copy:fonts']);
  grunt.registerTask('build', ['clean', 'todos', 'build:server', 'build:client', 'build:html', 'build:css', 'build:assets', 'clean:tmp', 'mkdir:tmp']);
  return grunt.registerTask('build:prod', ['build', 'useminPrepare', 'uglify:app', 'concat:generated', 'recess:dist', 'rev', 'usemin']);
};
