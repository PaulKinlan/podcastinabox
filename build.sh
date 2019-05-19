#! /bin/bash
yum install -y wget

npm install

sh install-deps.sh

# Convert all the files.
# When this gets big we might not want to do this.
# Look for somethign like "size=     329kB time=00:00:21.81 bitrate= 123.4kbits/s speed=46.2x and output to file"
for i in site/static/audio/*.webm; do ./ffmpeg -y -i "$i" "${i%.*}.mp3"; done
for i in site/static/audio/*; do ./ffprobe -i "${i}" -v quiet -print_format json -show_format -show_streams > "site/data/$(basename $i).json"; done

./hugo -s ./site/ -d ../dist --minify
