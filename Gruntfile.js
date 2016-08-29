module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'public/scripts/*.js', 'routes/*.js']
    },
    watch: {
      files: ['client/*.js'],
      tasks: ['uglify']
    },
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'node_modules', src: ['angular/**', 'bootstrap/**'], dest: 'dest/'}
        ]
      }
    },
    uglify: {
     my_target: {
      //  options: {
      //    mangle: false
      //  },
       files: {
         'public/assets/client.min.js': ['client/app.module.js', 'client/app.config.js', 'client/MainController.js', 'client/DataService.js', 'client/LoginController.js','client/GettingDataController.js', 'client/HomeController.js', 'client/EditController.js', 'client/SettingsController.js', 'client/RouteService.js', 'client/EmailService.js', 'client/TemplateService.js', 'client/ModalController.js', 'client/DonationService.js', 'client/OverviewController.js']
       }
     }
   }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify', 'watch']);

};
