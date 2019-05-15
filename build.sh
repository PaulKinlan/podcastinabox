#! /bin/bash

yum install -y wget

git submodule update --init --recursive -j 8

npm install

sh install-hugo.sh

cp -r node_modules/@editorjs/editorjs/dist site/static/javascripts/editorjs/
cp -r node_modules/@editorjs/raw/dist/bundle.js site/static/javascripts/editorjs/raw.js
cp -r node_modules/@editorjs/quote/dist/bundle.js site/static/javascripts/editorjs/quote.js
cp -r node_modules/@editorjs/header/dist/bundle.js site/static/javascripts/editorjs/header.js
cp -r node_modules/@editorjs/paragraph/dist/bundle.js site/static/javascripts/editorjs/paragraph.js
cp -r node_modules/@editorjs/code/dist/bundle.js site/static/javascripts/editorjs/code.js
cp -r node_modules/@editorjs/list/dist/bundle.js site/static/javascripts/editorjs/list.js
cp -r node_modules/@editorjs/link/dist/bundle.js site/static/javascripts/editorjs/link.js
cp -r node_modules/@editorjs/simple-image/dist/bundle.js site/static/javascripts/editorjs/simple-image.js

./hugo -d dist --minify
