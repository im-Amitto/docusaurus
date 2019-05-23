---
id: chapter_1
title: Chapter 1 - Building a new Rails application
---

## 1.1 - Build a new Rails application

Let's create a new Rails application.

```bash
$ rails new tasksmanager
      create
      create  README.md
      create  Rakefile
      create  .ruby-version
      create  config.ru
      create  .gitignore
      create  Gemfile
         run  git init from "."
Initialized empty Git repository in /Users/raj.singh/code/extra/bigbinary-projects/learn-ruby-on-rails-book/tasksmanager/.git/
      create  package.json
      create  app
      create  app/assets/config/manifest.js
      create  app/assets/javascripts/application.js
      create  app/assets/javascripts/cable.js
      create  app/assets/stylesheets/application.css
      create  app/channels/application_cable/channel.rb
      create  app/channels/application_cable/connection.rb
      create  app/controllers/application_controller.rb
      create  app/helpers/application_helper.rb
      create  app/jobs/application_job.rb
      create  app/mailers/application_mailer.rb
      create  app/models/application_record.rb
      create  app/views/layouts/application.html.erb
      create  app/views/layouts/mailer.html.erb
      create  app/views/layouts/mailer.text.erb
      create  app/assets/images/.keep
      create  app/assets/javascripts/channels
      create  app/assets/javascripts/channels/.keep
      create  app/controllers/concerns/.keep
      create  app/models/concerns/.keep
      create  bin
      create  bin/bundle
      create  bin/rails
      create  bin/rake
      create  bin/setup
      create  bin/update
      create  bin/yarn
      create  config
      create  config/routes.rb
      create  config/application.rb
      create  config/environment.rb
      create  config/cable.yml
      create  config/puma.rb
      create  config/spring.rb
      create  config/storage.yml
      create  config/environments
      create  config/environments/development.rb
      create  config/environments/production.rb
      create  config/environments/test.rb
      create  config/initializers
      create  config/initializers/application_controller_renderer.rb
      create  config/initializers/assets.rb
      create  config/initializers/backtrace_silencers.rb
      create  config/initializers/content_security_policy.rb
      create  config/initializers/cookies_serializer.rb
      create  config/initializers/cors.rb
      create  config/initializers/filter_parameter_logging.rb
      create  config/initializers/inflections.rb
      create  config/initializers/mime_types.rb
      create  config/initializers/new_framework_defaults_5_2.rb
      create  config/initializers/wrap_parameters.rb
      create  config/locales
      create  config/locales/en.yml
      create  config/master.key
      append  .gitignore
      create  config/boot.rb
      create  config/database.yml
      create  db
      create  db/seeds.rb
      create  lib
      create  lib/tasks
      create  lib/tasks/.keep
      create  lib/assets
      create  lib/assets/.keep
      create  log
      create  log/.keep
      create  public
      create  public/404.html
      create  public/422.html
      create  public/500.html
      create  public/apple-touch-icon-precomposed.png
      create  public/apple-touch-icon.png
      create  public/favicon.ico
      create  public/robots.txt
      create  tmp
      create  tmp/.keep
      create  tmp/cache
      create  tmp/cache/assets
      create  vendor
      create  vendor/.keep
      create  test/fixtures
      create  test/fixtures/.keep
      create  test/fixtures/files
      create  test/fixtures/files/.keep
      create  test/controllers
      create  test/controllers/.keep
      create  test/mailers
      create  test/mailers/.keep
      create  test/models
      create  test/models/.keep
      create  test/helpers
      create  test/helpers/.keep
      create  test/integration
      create  test/integration/.keep
      create  test/test_helper.rb
      create  test/system
      create  test/system/.keep
      create  test/application_system_test_case.rb
      create  storage
      create  storage/.keep
      create  tmp/storage
      create  tmp/storage/.keep
      remove  config/initializers/cors.rb
      remove  config/initializers/new_framework_defaults_5_2.rb
         run  bundle install
The dependency tzinfo-data (>= 0) will be unused by any of the platforms Bundler is installing for. Bundler is installing for ruby but the dependency is only for x86-mingw32, x86-mswin32, x64-mingw32, java. To add those platforms to the bundle, run `bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java`.
Fetching gem metadata from https://rubygems.org/.........
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Using rake 12.3.2
Using concurrent-ruby 1.1.4
Fetching i18n 1.5.3
Installing i18n 1.5.3
Using minitest 5.11.3
Using thread_safe 0.3.6
Using tzinfo 1.2.5
Using activesupport 5.2.2
Using builder 3.2.3
Using erubi 1.8.0
Using mini_portile2 2.4.0
Using nokogiri 1.10.1
Using rails-dom-testing 2.0.3
Using crass 1.0.4
Using loofah 2.2.3
Using rails-html-sanitizer 1.0.4
Using actionview 5.2.2
Using rack 2.0.6
Using rack-test 1.1.0
Using actionpack 5.2.2
Using nio4r 2.3.1
Using websocket-extensions 0.1.3
Using websocket-driver 0.7.0
Using actioncable 5.2.2
Using globalid 0.4.2
Using activejob 5.2.2
Using mini_mime 1.0.1
Using mail 2.7.1
Using actionmailer 5.2.2
Using activemodel 5.2.2
Using arel 9.0.0
Using activerecord 5.2.2
Using mimemagic 0.3.3
Using marcel 0.3.3
Using activestorage 5.2.2
Using public_suffix 3.0.3
Using addressable 2.6.0
Using io-like 0.3.0
Using archive-zip 0.11.0
Using bindex 0.5.0
Using msgpack 1.2.6
Using bootsnap 1.3.2
Using bundler 2.0.1
Using byebug 10.0.2
Using regexp_parser 1.3.0
Using xpath 3.2.0
Fetching capybara 3.13.2
Installing capybara 3.13.2
Using ffi 1.10.0
Using childprocess 0.9.0
Using chromedriver-helper 2.1.0
Using coffee-script-source 1.12.2
Using execjs 2.7.0
Using coffee-script 2.4.1
Using method_source 0.9.2
Using thor 0.20.3
Using railties 5.2.2
Using coffee-rails 4.2.2
Using multi_json 1.13.1
Using jbuilder 2.8.0
Using rb-fsevent 0.10.3
Using rb-inotify 0.10.0
Using ruby_dep 1.5.0
Using listen 3.1.5
Using puma 3.12.0
Using sprockets 3.7.2
Using sprockets-rails 3.2.1
Using rails 5.2.2
Using rubyzip 1.2.2
Using sass-listen 4.0.0
Using sass 3.7.3
Using tilt 2.0.9
Using sass-rails 5.0.7
Using selenium-webdriver 3.141.0
Using spring 2.0.2
Using spring-watcher-listen 2.0.1
Using sqlite3 1.3.13
Using turbolinks-source 5.2.0
Using turbolinks 5.2.0
Using uglifier 4.1.20
Using web-console 3.7.0
Bundle complete! 18 Gemfile dependencies, 79 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
Post-install message from i18n:

HEADS UP! i18n 1.1 changed fallbacks to exclude default locale.
But that may break your application.

Please check your Rails app for 'config.i18n.fallbacks = true'.
If you're using I18n (>= 1.1.0) and Rails (< 5.2.2), this should be
'config.i18n.fallbacks = [I18n.default_locale]'.
If not, fallbacks will be broken in your app by I18n 1.1.x.

For more info see:
https://github.com/svenfuchs/i18n/releases/tag/v1.1.0

         run  bundle exec spring binstub --all
* bin/rake: spring inserted
* bin/rails: spring inserted
```

## 1.2 Build database

[SQlite3 database](https://www.sqlite.org/index.html)
is the default database used when new Ruby on Rails application is created.

```bash
$ cd tasksmanager
$ rails db:create

Created database 'db/development.sqlite3'
Created database 'db/test.sqlite3'
```

## 1.3 Start server

Now let's start the server.

```bash
$ rails server

=> Booting Puma
=> Rails 5.2.2 application starting in development
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.12.0 (ruby 2.5.1-p57), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://0.0.0.0:3000
Use Ctrl-C to stop
```

Open your browser and visit
[http://localhost:3000](http://localhost:3000).
You should see
[default welcome page](https://monosnap.com/direct/SiDAbKoyLaKjvwavKkdH9vtQIVpFsC).


You can specify the port on which you want to run the server using `-p` option
```bash
$ rails server -p 5000
```
The above command will run server on port 5000.
The default welcome page can then be accessed at [http://localhost:5000](http://localhost:5000).
