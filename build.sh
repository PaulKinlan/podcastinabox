#! /bin/bash
yum install -y wget
rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro && rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
yum install ffmpeg
git submodule update --init --recursive -j 8

npm install

sh install-hugo.sh

# Convert all the files.
# When this gets big we might not want to do this.
for i in site/static/audio/*.webm; do ffmpeg -i "$i" "${i%.*}.mp3"; done

./hugo -s ./site/ -d ../dist --minify
