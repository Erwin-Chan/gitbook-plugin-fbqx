GitBook Fill-in-the-blank Plugin
===

## Demo

See the plugin at work here: [Click Here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_fbqx.html)

## Changelog

* **0.1.0:** Fixed clear history button.

## Basic syntax

Enclose the answers that you desired to be inputted by the user within ```$$``` and ```##```, for example, to output a question like this:

```
Testing the plugin, enter the word "hello" into the field ______, "world" into ______.
```

The syntax for the question would be:

```
Testing the plugin, enter the word "hello" into the field $$hello##, "world" into $$world##.
```

Note that the whitespaces before or after the phrase enclosed within ```$$``` and ```##``` will not be ignored, so please take extra cares to them. Also, due to the syntax of the plugin, you cannot include ```$$``` and ```##``` as a part of the answer.
