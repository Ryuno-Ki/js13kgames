# JS13K-Breaker-Panel

This is my attempt to take part at [js13kgames](http://www.js13kgames.com/) competition 2015.

In order to comply with the file size limit of 13k bytes, I am writing in plain ECMAScript 5.

For automation purposes I'm using good old `grunt`.

## Test suite

I like the way, Chai tests are written, so I use it together with Mocha.

Sadly DOM access is tricky to do (if you want to avoid jQuery dependencies), so I depend on jsdom to mock it.

## LICENSE

GPL v3. See [LICENSE](LICENSE.md) for more details.
