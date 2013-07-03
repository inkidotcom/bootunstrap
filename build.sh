#!/bin/bash

OPTIONS="clean bootstrap update quit"
ARGS="clean|bootstrap|update"
BOOTSTRAP_LESS=./less/bootstrap.less
BOOTSTRAP_RESPONSIVE_LESS=./less/responsive.less
VERSION="v0.1.0"


function clean {
	echo -e "\033[32mstarting clean..."
	echo -e "removing js/ css/ directories...\033[31m"
	rm -r js/bootstrap
	rm -r css/bootstrap
	echo -e "\033[32mdone"
	echo -e "clean finished\033[0m"
}

function update () {
	echo -e "\033[32mupdating bootstrap..."
	echo -e "discarding changes...\033[31m"
	cd ./bootstrap && git checkout -- .
	echo -e "\033[32mdone"
	if [ -z "$1" ]
	then
		echo -e "pull latest bootstrap...\033[31m"
		git pull origin master
	else
		echo -e "pull origin $1 bootstrap...\033[31m"
		git pull origin $1
	fi
	echo -e "\033[32mdone"
	echo -e "update finished\033[0m"
}

function bootstrap {
	echo -e "\033[32mstarting bootstrap..."
	echo "creating directories..."
	mkdir -p css/bootstrap
	mkdir -p js/bootstrap
	echo "done"
	echo "compiling less files..."
	recess --compile $BOOTSTRAP_LESS > css/bootstrap/bootstrap.css
	recess --compress $BOOTSTRAP_LESS > css/bootstrap/bootstrap.min.css
	recess --compile $BOOTSTRAP_RESPONSIVE_LESS > css/bootstrap/bootstrap-responsive.css
	recess --compress $BOOTSTRAP_RESPONSIVE_LESS > css/bootstrap/bootstrap-responsive.min.css
	echo "done"
	echo "building js files..."
	cat bootstrap/js/transition.js bootstrap/js/alert.js bootstrap/js/button.js bootstrap/js/carousel.js bootstrap/js/collapse.js bootstrap/js/dropdown.js bootstrap/js/modal.js bootstrap/js/tooltip.js bootstrap/js/popover.js bootstrap/js/scrollspy.js bootstrap/js/tab.js bootstrap/js/affix.js > js/bootstrap/bootstrap.js
	uglifyjs -nc js/bootstrap/bootstrap.js > js/bootstrap/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > js/bootstrap/copyright.js
	cat js/bootstrap/copyright.js js/bootstrap/bootstrap.min.tmp.js > js/bootstrap/bootstrap.min.js
	rm js/bootstrap/copyright.js js/bootstrap/bootstrap.min.tmp.js
	echo "done"
	echo -e "\033[32mbootstrap finished\033[0m"
}


function menu {
	select opt in $OPTIONS; do
		if [ "$opt" = "quit" ]; then
			echo -e "\033[0m"
			exit
		elif [ "$opt" = "clean" ]; then
			clean
		elif [ "$opt" = "bootstrap" ]; then
			bootstrap
		elif [ "$opt" = "update" ]; then
			update
		else
			#clear
			echo -e "\033[31mbad option (enter 1, 2 or 3 [or 4 to quit])\033[0m"
		fi
	done
}


if [ -z "$1" ]; then 
	menu
	exit
else
	if [ $1 = 'clean' ]; then
		clean
	elif [ $1 = 'bootstrap' ]; then
		bootstrap
	elif [ $1 = 'update' ]; then
		update $2
	elif [ $1 = '-v' ]; then
	  echo $VERSION
	else
		echo -e "\033[31musage: $0 [$ARGS]\033[0m"
		exit
	fi
fi

