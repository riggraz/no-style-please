# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "no-style-please"
  spec.version       = "0.4.9"
  spec.authors       = ["Riccardo Graziosi"]
  spec.email         = ["riccardo.graziosi97@gmail.com"]

  spec.summary       = "A (nearly) no-CSS, fast, minimalist Jekyll theme."
  spec.homepage      = "https://github.com/riggraz/no-style-please"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.10.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8.0"
  spec.add_runtime_dependency "jektex", "~> 0.1.1"

  spec.required_ruby_version = '>= 3.4'
end
