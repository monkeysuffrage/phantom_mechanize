require "mechanize"
require "phantom_mechanize/version"
require "phantom_mechanize/ext/mechanize"

module PhantomMechanize
  JS_FOLDER = Gem.loaded_specs["phantom_mechanize"].gem_dir + '/js'
end

exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
unless ENV['PATH'].split(File::PATH_SEPARATOR).any?{|x| exts.find{|ext| File.exists? File.join(x, "phantomjs#{ext}")}}
  raise 'Phantomjs not found in path'
end
