begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :build do
  begin
    File.open('lib/cookie-jar.js', 'w+') do |file|
      ['cookie.js', 'jar.js'].each do |src_file|
        file << "#{File.open("src/#{src_file}", "r").readlines.join}\n"
      end
    end
    puts "Built successfully into lib/cookie-jar.js"
  rescue IOError => e
    puts e.message
  end
end
