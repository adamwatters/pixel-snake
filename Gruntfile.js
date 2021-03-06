module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", { presets: ["es2015"] }]
          ]
        },
        files: {
          "./main.js": ["./src/index.js"]
        }
      }
    },
    watch: {
      js: {
        files: ["./src/*.js"],
        tasks: ["browserify"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["browserify", "watch"]);
  grunt.registerTask("build", ["browserify"]);
};
