class Mechanize
	def phget url, *args
    
    args = args[0] || {}
    wait = args[:wait] || 10000
    selector = args[:selector] || ""
    scroll = args[:scroll] ? 1 : 0
    selector = [selector] if selector.is_a?(String)
    js = args[:js] || ""
    js = [js] if js.is_a?(String)

    pc = cookies.map{|c| [c.name, c.value, c.domain, c.path, c.httponly, c.secure, c.expires.to_i]}.to_json

    ph_args = ['--ssl-protocol=any', '--web-security=false']
    ph_args << "--proxy=#{proxy_addr}:#{proxy_port}" if proxy_port && proxy_addr

    cmd = "phantomjs #{ph_args.join(' ')} \"#{PhantomMechanize::JS_FOLDER}/phget.js\" \"#{url}\" \"#{wait}\" \"#{selector.to_json.gsub('"', '\"')}\" \"#{pc.gsub('"', '\"')}\" \"#{user_agent.gsub('"', '\"')}\" \"#{js.to_json.gsub('"', '\"')}\" \"#{scroll.to_json}\""
    response = %x[#{cmd}]

    raise 'bad response' if response == ''

    mcs, html = response.split '<<<phget_separator>>>'
    JSON.parse(mcs).each do |mc|
      cookie = Cookie.new Hash[mc.map{|k, v| [k.to_sym, v]}]
      cookie_jar << cookie
    end

    page = Mechanize::Page.new URI.parse(url), [], html, nil, self
	end
end
