# PhantomMechanize

A Phantomjs addon for Ruby Mechanize

## Preliminary

This gem require phantomjs-2.0.0 (download this [phantomjs2 release]). 

Then `mv/cp` the binary to `/bin/`. You should be good to go.

[phantomjs2 release]: https://github.com/eugene1g/phantomjs/releases/tag/2.0.0-bin

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'phantom_mechanize'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install phantom_mechanize

## Usage
```ruby
require 'phantom_mechanize'
agent = Mechanize.new
page = agent.phget 'http://www.google.com', :wait => 10000, :selector => '[name=q]'

# use some js to submit a form or interact with the dom:
page = agent.phget 'http://www.google.com', :selector => ['[name=q]', 'h3 a'], :js => "$('[name=q]').val('phantom_mechanize');$('form').submit()"

# return page after scrolling has completed
page = agent.phget 'http://www.somescrollingpage.com', :scroll => true


```
## Options
* :selector - return once this selector is located (jquery)
* :wait - wait this many milliseconds (default 10,000)
* :scroll - scroll to the bottom until no more results show up (infinite scrolling)

## Faq
> What about cookies?

Cookies get sent to Phantomjs and reloaded into Mechanize when it returns.
> What about user_agent?

Phantomjs will use the same user agent as Mechanize
> What about http proxy?

Phantomjs will use the same http proxy as Mechanize


## Contributing

1. Fork it ( https://github.com/monkeysuffrage/phantom_mechanize/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
