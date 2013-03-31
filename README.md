Mousetrap bind elements
=======================
This is an extension to the mousetrap shortcuts library. It allows you to bind DOM elements to shortcut keys

Usage
=====
To use this library you must include the mousetrap library before this extension. Then just add the data-mousetrap attribute to the element. for example: 

    <input type="button" onclick="alert('test')" data-mousetrap="/" />

Then call:

    mousetrap.bindElements();

To initialise the bindings.

Help
====

As well as binding to DOM elements you can bind a key to show all current shortcuts. To do this just call:

    mousetrap.bindPopup('ctrl+;');

Examples
========

Please see ...
