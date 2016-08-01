GitBook Fill-in-the-blank Plugin
===

## Demo

See a working example for the plugin here: [Click Here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_fbqx.html)

## Changelog

* **1.0.0:** (requies gitbook 3.0 or up) fixed problem with ## escaped in gitbook 3.0+.

* **0.1.3:** Improved pdf export appearance.
* **0.1.2:** No code change, updated with much clearer documentation.
* **0.1.0:** Fixed clear history button.

## Basic syntax

Enclose the answers that you desired to be inputted by the user within ```$$``` and ```##```, for example, to output a question like this:

```
{%fbq%}Testing the plugin, enter the word "hello" into the field ______, "world" into ______.{%endfbq%}
```

The syntax for the question would be:

```
{%fbq%}Testing. Please type $$hello## (hello) and $$world## (world).{%endfbq%}
```

Note that the whitespaces before or after the phrase enclosed within ```$$``` and ```##``` will not be ignored, so please take extra cares to them. Also, due to the syntax of the plugin, you cannot include ```$$``` and ```##``` as a part of the answer.
