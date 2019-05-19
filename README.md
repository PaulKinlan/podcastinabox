Podcast in a box
================

Goal a fully browser side only podcasting tool.

* Can record in the client (See podcastinabox-editor)
* Can create new entries and post episodes all on the client.

How does this work
==================

This is a simple template and build process for setting up a podcast.

It can be thought of as two steps: A data processing phase, a build step that uses huge for templating

The data processing phase utilises:

* A build script that will convert all webm files to mp3
* A build script that will generate all the required meta data to help generate the site.

The build step is a simple Hugo template that:

* Is set up to generate the correct RSS feed from the data
* Is designed to be replacable by your own styling.
* Enables you to play the audio on the page

How to set this up
==================

The hosting right now is on zeit.
It uses hugo and will download all the required assets and a known good version of ffmpeg.

FAQ
===

* Why is the editor not in here?
  - The editor is neat, but not required. The editor will be able to push files in to your
  hosted respoitory given the strict file format and the strict data structure, but it is not
  required.
