module.exports = function (grunt) {
  grunt.initConfig({
    watch:{
      scripts:{
        files:['fuente/*.js'],
        tasks: ['browserify'],
      }
    },
    browserify:{
      client: {
        src: ['fuente/*.js'],
        dest: 'js/bundle.js',
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  
  grunt.registerTask('default',['watch']);
}