#! /bin/bash

yum install -y wget

git submodule update --init --recursive -j 8

npm install

sh install-hugo.sh


./hugo -s ./site/ -d ../dist --minify
