HUGO_VERSION=0.54.0
FFMPEG_VERSION="ffmpeg-release-i686-static.tar.xz"

set -x
set -e

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=macOS;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${unameOut}"
esac

# Install Hugo if not already cached or upgrade an old version.
if [ ! -e .hugo ]; then
  wget -q --no-check-certificate https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_${MACHINE}-64bit.tar.gz -P .hugo/
  tar xvzf .hugo/hugo_${HUGO_VERSION}_${MACHINE}-64bit.tar.gz -C .hugo/
  cp .hugo/hugo ./hugo
fi

if [ ! -e ffmpeg ]; then
  wget -q --no-check-certificate https://johnvansickle.com/ffmpeg/releases/${FFMPEG_VERSION}
  FFMPEG="$(tar -tf ${FFMPEG_VERSION} --wildcards '*/ffmpeg')"
  FFPROBE="$(tar -tf ${FFMPEG_VERSION} --wildcards '*/ffprobe')"
  tar -xf ${FFMPEG_VERSION} --wildcards '*/ff*'
  cp ${FFMPEG} .
  cp ${FFPROBE} .
fi