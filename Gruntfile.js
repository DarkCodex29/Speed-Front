module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-war');
	grunt.loadNpmTasks('grunt-shell');

	grunt.initConfig({
		shell: {
			deploy: {
				options: { stdout: true },
				command: ['ng build --base-href . --configuration production --aot'].join('&&')
			}
		},

		pkg: grunt.file.readJSON('package.json'),
		war: {
			target: {
				options: {
					war_dist_folder: 'war_file',
					war_name: 'SpeedFront'
				},
				files: [
					{
						expand: true,
						cwd: 'dist/speed-front',
						src: ['**'],
						dest: ''
					}
				]
			}
		}
	});
	grunt.registerTask('default', ['shell', 'war']);
};
