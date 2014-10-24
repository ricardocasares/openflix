module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		release: {
			options: {
				//bump: false, //default: true
				//file: 'component.json', //default: package.json
				//add: false, //default: true
				//commit: false, //default: true
				//tag: false, //default: true
				//push: false, //default: true
				//pushTags: false, //default: true
				//npmtag: true, //default: no tag
				//folder: 'folder/to/publish/to/npm', //default project root
				//commitMessage: 'check out my release <%= version %>', //default: 'release <%= version %>'
				//tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',

				file: 'bower.json', //default: package.json
				npm: false, //default: true
				tagName: 'v<%= version %>', //default: '<%= version %>'
				github: {
					repo: '2fdevs/bower-videogular-poster', //put your user/repo here
					usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
					passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-release');

	grunt.registerTask('major', ['release:major']);
	grunt.registerTask('minor', ['release:minor']);
	grunt.registerTask('patch', ['release:patch']);
};
