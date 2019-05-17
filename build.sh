#! /bin/bash
yum install -y wget
git submodule update --init --recursive -j 8

npm install

sh install-hugo.sh

# Convert all the files.
# When this gets big we might not want to do this.
for i in site/static/audio/*.webm; do ffmpeg -i "$i" "${i%.*}.mp3"; done

./hugo -s ./site/ -d ../dist --minify
