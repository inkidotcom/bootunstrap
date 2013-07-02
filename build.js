// make sure you have NODE_PATH set up
// echo 'export TEST_PATH="'$(npm root -g)'"' >> ~/.bashrc && . ~/.bashrc

var fs      = require('fs');
var shell   = require('shelljs');
var recess  = require('recess');

var version = 'v0.1.0';
var cwd     = process.cwd();



/* SHELL FORMATTING */

var format = {
	// type
	'bold': function( msg ) {
		return '\033[1m' + msg + '\033[21m';
	},
	'dim': function( msg ) {
		return '\033[2m' + msg + '\033[22m';
	},
	'underline': function( msg ) {
		return '\033[4m' + msg + '\033[24m';
	},
	'blink': function( msg ) {
		return '\033[5m' + msg + '\033[25m';
	},
	'reverse': function( msg ) {
		return '\033[7m' + msg + '\033[27m';
	},
	'hidden': function( msg ) {
		return '\033[8m' + msg + '\033[28m';
	},
	
	//colors
	'red': function( msg ) {
		return '\033[31m' + msg + '\033[0m';
	},
	'green': function( msg ) {
		return '\033[32m' + msg + '\033[0m';
	},
	'yellow': function( msg ) {
		return '\033[33m' + msg + '\033[0m';
	},
	'blue': function( msg ) {
		return '\033[34m' + msg + '\033[0m';
	}
}
var f = format;



/* COMMANDS */

var commands = { };

commands.clean = function() {
	console.log(f.blue('starting clean...'));
	console.log(f.green('removing js/ css/ directories...'));
	shell.rm('-rf', [cwd+'/css/bootstrap', cwd+'/js/bootstrap']);
	console.log(f.blue('clean done'));
}

commands.bootstrap = function() {
	console.log(f.blue('starting bootstrap...'));
	
	commands.clean();
	
	console.log(f.blue('creating local bootstrap directories...'));
	shell.mkdir(cwd+'/css/bootstrap');
	shell.mkdir(cwd+'/js/bootstrap');
	console.log(f.blue('finished creating local bootstrap directories...'));
	
	//console.log(f.green('copying bootstrap images...'));
	//shell.cp('-R', cwd+'/bootstrap/img/*', cwd+'/img/bootstrap/');
	//console.log(f.green('finished copying bootstrap images...'));
	
	console.log(f.green('compiling bootstrap less files...'));
	var cont = shell.exec('recess --compile '+cwd+'/less/bootstrap.less > '+cwd+'/css/bootstrap/bootstrap.css', { silent: true }).output;
	cont.to(cwd+'/css/bootstrap/bootstrap.css');
	cont = shell.exec('recess --compress '+cwd+'/less/bootstrap.less > '+cwd+'/css/bootstrap/bootstrap.min.css', { silent: true }).output;
	cont.to(cwd+'/css/bootstrap/bootstrap.min.css');
	//cont = shell.exec('recess --compile '+cwd+'/less/responsive.less > '+cwd+'/css/bootstrap/responsive.css', { silent: true }).output;
	//cont.to(cwd+'/css/bootstrap/responsive.css');
	//cont = shell.exec('recess --compress '+cwd+'/less/responsive.less > '+cwd+'/css/bootstrap/responsive.min.css', { silent: true }).output;
	//cont.to(cwd+'/css/bootstrap/responsive.min.css');
	console.log(f.green('finished compiling bootstrap less files...'));
	
	console.log(f.green('compiling bootstrap js files...'));
	shell.cat(cwd+'/bootstrap/js/transition.js', cwd+'/bootstrap/js/alert.js', cwd+'/bootstrap/js/button.js', cwd+'/bootstrap/js/carousel.js', cwd+'/bootstrap/js/collapse.js', cwd+'/bootstrap/js/dropdown.js', cwd+'/bootstrap/js/modal.js', cwd+'/bootstrap/js/tooltip.js', cwd+'/bootstrap/js/popover.js', cwd+'/bootstrap/js/scrollspy.js', cwd+'/bootstrap/js/tab.js', cwd+'/bootstrap/js/affix.js').to(cwd+'/js/bootstrap/bootstrap.js');
	cont = shell.exec('uglifyjs -nc '+cwd+'/js/bootstrap/bootstrap.js > '+cwd+'/js/bootstrap/bootstrap.min.tmp.js', { silent: true }).output;
	cont.to(cwd+'/js/bootstrap/bootstrap.min.tmp.js');
	var copyright = shell.echo("/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/").to(cwd+'/js/bootstrap/copyright.js');
	shell.cat(cwd+'/js/bootstrap/copyright.js', cwd+'/js/bootstrap/bootstrap.min.tmp.js').to(cwd+'/js/bootstrap/bootstrap.min.js');
	shell.rm(cwd+'/js/bootstrap/bootstrap.min.tmp.js', cwd+'/js/bootstrap/copyright.js');
	console.log(f.green('finished compiling bootstrap js files...'));
	
	console.log(f.blue('bootstrap done'));
}

commands.update = function() {
	console.log(f.blue('starting update...'));
	
	console.log(f.green('discarding changes...'));
	shell.cd(cwd+'/bootstrap');
	shell.exec('git checkout -- .');
	console.log(f.green('finished discarding changes...'));
	
	if (typeof(process.argv[3]) != 'undefined') {
		console.log(f.green('pull origin '+process.argv[3]+' bootstrap...'));
		shell.exec('git pull origin '+process.argv[3]);
	} else {
		console.log(f.green('pull origin master bootstrap...'));
		shell.exec('git pull origin master');
	};
	console.log(f.green('finished pull...'));
	
	console.log(f.blue('update done'));
}

commands.version = function() {
	console.log(version);
}



/* USAGE ERROR */

var usage_error = function() {
	console.log(f.red('usage: $ node build.js [clean|bootstrap|update]'));
}



/* MAIN */

if (process.argv.length > 2) {
	switch(process.argv[2]) {
		case 'clean':
			commands.clean();
			break;
		case 'bootstrap':
			commands.bootstrap();
			break;
		case 'update':
			commands.update();
			break;
		case '-v':
			commands.version();
			break;
		default:
			console.log(f.red('Command \"' + f.underline(process.argv[2]) + '\" not a valid command.'));
			usage_error();
			process.exit(1);
	}
	process.exit(code=0)
} else {
	usage_error();
	process.exit(1);
}
