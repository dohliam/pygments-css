require 'kramdown'
require 'kramdown-parser-gfm'

md = File.read("index.md")
html = Kramdown::Document.new(md, input: 'GFM').to_html

$content = html

output = ERB.new(File.read("template.rhtml")).result

outfile_name = "index.html"
File.open(outfile_name, "w") { |o| o << output }
