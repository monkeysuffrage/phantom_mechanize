class Mechanize
	def phget url, *args
    args = args[0] || {}
    wait = args[:wait] || 10000
    selector = args[:selector] || ""

    pc = cookies.map{|c| [c.name, c.value, c.domain, c.path, c.httponly, c.secure, c.expires.to_i]}.to_json

    ph_args = []
    ph_args << "--proxy=#{proxy_addr}:#{proxy_port}" if proxy_port && proxy_addr
    
    response = `phantomjs #{ph_args.join(' ')} "#{PhantomMechanize::JS_FOLDER}/phget.js" "#{url}" "#{wait}" "#{selector.gsub('"', '\"')}" "#{pc.gsub('"', '\"')}" "#{user_agent.gsub('"', '\"')}"`
    mcs, html = response.split '<<<phget_separator>>>'
    JSON.parse(mcs).each do |mc|
      cookie = Cookie.new Hash[mc.map{|k, v| [k.to_sym, v]}]
      cookie_jar << cookie
    end

    page = Mechanize::Page.new URI.parse(url), [], html, nil, self
	end
end