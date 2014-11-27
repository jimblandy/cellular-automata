Launching Golly From The Presentation
=====================================

(Note: this is about how to view a copy of the presentation you've checked
out onto your own computer. These instructions are not sufficient to make
the presentation visible from the web, even if you've installed Golly.)

Some of the slides in the presentation are just links to patterns or Python
scripts to be viewed in Golly, a cellular automaton explorer. You can always
just fire up Golly yourself, but if you want to make a slick presentation, you
probably want to be able to just click on the link and have Golly pop up.

This requires a bit of hacking. I have no idea how to do it on other systems,
but here's how I did things on Linux. I run Fedora and GNOME Shell, but I
believe the programs used here are common to all the Linux-based desktop
environments.

Let's make sure that your desktop is set up the way mine is; otherwise, these
instructions may not apply to you. Check the following:

- You should have Golly installed.
- You should have the xdg-mime shell command installed.
- You should have a /usr/share/applications/golly.desktop file.
- You should have a $HOME/.local/share/applications directory.

If that's all in place, let's make up some MIME types. ("Boy, that escalated
quickly.")

- `application/golly-macrocell` is Golly's "macrocell" file format, capable of
  saving very large universes. These are ".mc" files.

- `application/golly-extended-rle` is Golly's "extended run-length encoded" file
  format. These are ".rle" files. (Note that this extension is the same as that
  used by an old CompuServe image file format. We will override that.)

- `application/golly-script` is our own invention: a file containing the name of
  a Python or Perl script Golly should run. If the contained filename is
  relative, it is interpreted as relative to the containing file. These are
  files whose names end in ".gollyscript". Using a file name extension other
  than ".py" or ".pl" lets us associate our own MIME type and application with
  our files.

The file `golly-mimetypes.xml` associates these MIME types with these file name
extensions. Let's install that file, and check the results:

  xdg-mime install golly-mimetypes.xml
  xdg-mime query filetype slow-glider.gollyscript

The second command should print:

  application/golly-script

Next, we need to tell the desktop that Golly can handle these MIME types. An
application's ".desktop" file indicates which types it handles, so let's copy
Golly's .desktop file where we can change it:

  cp /usr/share/applications/golly.desktop $HOME/.local/share/applications

Now edit $HOME/.local/share/applications/golly.desktop, and add our first two
mime types. This leaves my copy looking like the below (it's the last line that
matters):

  [Desktop Entry]
  Name=Golly
  GenericName=Golly cellular automata simulator
  Exec=golly
  Icon=golly
  Terminal=false
  Type=Application
  Categories=GNOME;Game;LogicGame;
  MimeType=application/golly-macrocell;application/golly-extended-rle

Those are just the pattern file formats. To open our script files, we need
to install `golly-run-script` as a desktop application:

  cp golly-run-script $HOME/bin
  chmod +x $HOME/bin/golly-run-script
  cp golly-run-script.desktop $HOME/.local/share/applications

Now that we know which file name extensions denote which MIME types, and have
applications that can handle those types, we need to tell the desktop that those
applications are the default handlers for those types:

  xdg-mime default golly.desktop application/golly-macrocell
  xdg-mime default golly.desktop application/golly-extended-rle
  xdg-mime default golly-run-script.desktop application/golly-script

At this point, we've placed all the definitions where Firefox can find them, so
following a link to a ".mc" file should open up Golly and show the pattern; and
following a link to a ".gollyscript" file should open up Golly and run the
script.
