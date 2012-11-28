#Bootunstrap

Information:
---------------------

Bootstrap based project that keeps Bootstrap as a separate submodule



Dependancies:
---------------------

You'll need to have [Git](http://git-scm.com/) and  [NodeJS](http://nodejs.org/) installed along with the following Node Packages:

[Recess](https://github.com/twitter/recess) - A simple and attractive code quality tool for CSS built on top of LESS

[UglifyJS](https://github.com/mishoo/UglifyJS) - JavaScript parser / mangler / compressor / beautifier library for NodeJS

[ShellJS](https://github.com/arturadib/shelljs) - Portable Unix shell commands for Node.js

    $ sudo npm install recess uglify-js shelljs -g

*The build script that currently does all the build magic is written as a shell script so it may only work in *NIX sytems (should work with cygwin but haven't fully tested this.)

You'll want to make sure your **NODE_PATH** environment variable is set up

    $ echo 'export NODE_PATH="'$(npm root -g)'"' >> ~/.bashrc && . ~/.bashrc

In my case, I use **~/.profile** so I actually use...

    $ echo 'export NODE_PATH="'$(npm root -g)'"' >> ~/.profile && . ~/.profile


QUICK-START
---------------------

Checkout the Bootunstrap project and build

    $ git clone https://github.com/inkidotcom/bootunstrap.git bootunstrap
    $ cd bootunstrap
    $ git submodule update --init
    $ ./build.sh bootstrap

open index.html in your browser



Build Script
---------------------

You can run the build script without any options and you will be presented with the currently available options **clean**, **bootstrap**, **update** or **quit**

    $ ./build.sh

Or, you can run a command directly by passing it as an argument

    $ ./build.sh bootstrap

### Commands:

clean
: removes local Bootstrap files (css/bootstrap, img/bootstrap, js/bootstrap)

    $ ./build.sh clean

bootstrap
: compiles Bootstrap css and js and copies over Bootstrap img assets

    $ ./build.sh bootstrap

update <branch>
: updates Bootstrap to master or branch as specified by second parameter

    $ ./build.sh update
    $ ./build.sh update 2.2.2-wip



Authors:
---------------------

**Manny Ramirez**

+ [twiter](http://twitter.com/inki)
+ [github](https://github.com/inkidotcom)



Copyright and license
---------------------

Copyright 2012 Manny Ramirez.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
