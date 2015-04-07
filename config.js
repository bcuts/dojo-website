module.exports = function(grunt){

	var config = { }

	config.src = '/src';
	config.dest = '/dist';

	config.dojo = {
		ver: {
			get major(){ return '1.10' },
			get minor(){ return '.4'},
			get full(){ return this.major + this.minor},
			cnd: '1.10.3',
		}
	};

	config.guide = {
		ver: config.dojo.ver.major,
	};

	config.urls = {
		//Internal
		api: '/api/',
		blog: '/blog/',
		contribute: '/community/contribute.html',
		docs: '/documentation',
		download: '/download/',
		guide: '/reference-guide/' + config.dojo.ver.major,
		license: '/license/',
		roadmap: '/community/roadmap/',
		vision: '/community/roadmap/vision.html',
		support: '/#support',
		tutorials: '/documentation/',

		//External
		ext: {
			bugTracker: 'https://bugs.dojotoolkit.org/',
			commercialSupport: 'http://www.sitepen.com/support/index.html',
			facebook: 'https://www.facebook.com/groups/4375511291/',
			github: 'https://github.com/dojo',
			googlePlus: 'https://plus.google.com/106701567946037375891/posts',
			irc: 'http://irc.lc/freenode/dojo/t4nk@@@',
			mailingList: 'http://mail.dojotoolkit.org/mailman/listinfo/dojo-contributors',
			stackoverflow: 'http://stackoverflow.com/questions/tagged/dojo',
			twitter: 'http://twitter.com/dojo',
			dojoFoundation: 'http://dojofoundation.org'
		},

		tuts: {
			hello_dojo: '/documentation/tutorials/'+config.dojo.ver.major+'/hello_dojo',
		},

		//Dojo Release URLs
		dojo: {
			cdn: '//ajax.googleapis.com/ajax/libs/dojo/'+config.dojo.ver.cdn+'/dojo/dojo.js',
			download: 'http://download.dojotoolkit.org',
			get release(){ return this.download+'/release-'+config.dojo.ver.full },
			get sourceTar() { return this.release+'/dojo-release-'+config.dojo.ver.full+'-src.tar.gz'},
			get sourceZip() { return this.release+'/dojo-release-'+config.dojo.ver.full+'-src.zip'},
			get releaseTar() { return this.release+'/dojo-release-'+config.dojo.ver.full+'.tar.gz'},
			get releaseZip() { return this.release+'/dojo-release-'+config.dojo.ver.full+'.zip'},
			get releaseJs(){ return this.release+'/dojo.js'},
			get releaseJsUncompressed() { return this.release+'/dojo.js.uncompressed.js'},
		}
	};

	return config;
}