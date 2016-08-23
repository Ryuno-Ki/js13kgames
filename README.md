# JS13K-Breaker-Panel

This is [my attempt](https://ryuno-ki.github.io/js13kgames-2015/) to take part at [js13kgames](http://www.js13kgames.com/) competition 2015.

In order to comply with the file size limit of 13k bytes, I am writing in plain ECMAScript 5.

For automation purposes I'm using good old `grunt.

## Test suite

I like the way, Chai tests are written, so I use it together with Mocha.

Sadly DOM access is tricky to do (if you want to avoid jQuery dependencies), so I depend on jsdom to mock it.

Even more, when switching to RequireJS I couldn't figure out fast enough, how to modify the test suite. Help is welcome here.

## Thank you

I would like to thank some authors, which books helped me learn a good bunch about JavaScript in the last weeks:

 * Nicholas C. Zakas ([High Performance JavaScript](http://shop.oreilly.com/product/9780596802806.do))
 * Douglas Crockford ([JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do))
 * David Flanagan ([JavaScript: The Definitive Guide](http://shop.oreilly.com/product/9780596000486.do))

You'll likely see some ideas taken from there.

## Contact

If you have any questions, don't hesitate to ping me on [Twitter](https://twitter.com/AndreJaenisch).

My blogs are in German, so I assume, they won't help you much...

## LICENSE

GPL v3. See [LICENSE](LICENSE.txt) for more details.
