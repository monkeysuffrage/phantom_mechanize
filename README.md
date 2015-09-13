# PhantomMechanize

A Phantomjs addon for Ruby Mechanize

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
```
## Options
* :selector - return once this selector is located (jquery)
* :wait - wait this many milliseconds (default 10,000)

## Faq
> What about cookies?

Cookies get sent to Phantomjs and reloaded into Mechanize when it returns.
>> What about user_agent?

Phantomjs will use the same user agent as Mechanize
>> What about http proxy?

Phantomjs will use the same http proxy as Mechanize


## Contributing

1. Fork it ( https://github.com/monkeysuffrage/phantom_mechanize/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
