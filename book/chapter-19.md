As our application size grows,
it becomes important to offload some computing/processing
to run in the background so that the end user's
experience in terms of performance of the app doesn't take a hit.
In our next chapter, we will be sending notifications
to users when a task is assigned to them.
Time of email receipts depends on multiple factors like
in-app mail server, smtp server, email client etc.
and we cannot be blocked on these in order to provide
any feedback to the user after he/she assigns a task to someone.
Hence the process of sending emails will be carried out asynchronously.

In this chapter we will emphasize
on configuring and understanding the necessary settings
that are required to perform background processing.

Rails provides a framework known as ***Active Job***
that helps us declare jobs and making them run on a
variety of queueing backgrounds.

## Choosing a backend adapter

Active Job has a built-in support for
multiple queueing backends.
Some of the prominent queueing backends
are `Sidekiq`, `Resque`, `Delayed Job` etc.
Getting into details of each queueing adapter
is not within the scope of this book,
but you can always visit [this page](https://edgeapi.rubyonrails.org/classes/ActiveJob/QueueAdapters.html)
of Rails guides to know about
all the queueing adapters supported by Rails by default.

We'll choose `Sidekiq` as queueing adapter for our app.
Sidekiq uses redis to store all the operational data.
So let's setup redis on the development machine.
If you're using Mac OS, then redis will be installed
by following command.
```beam.assembly
brew install redis
```

Once it's done, start redis server
```beam.assembly
brew services start redis
```

Now redis should be up an running.

Go to your Gemfile and add the following line to install `sidekiq` gem.
```ruby
gem "sidekiq"
```
Run `bundle install` so that the gem gets installed and your apk is bundled with it.

Now open `config/application.rb` file.
You should find a block of code where all the configurations are set.
Add the following line in that block

```ruby
config.active_job.queue_adapter = :sidekiq
```

You're all set!
Now restart your Rails server and in an other terminal window/tab
run the following command to start sidekiq.

```bash
$ sidekiq
```

You'll notice that sidekiq process is running.
We'll refer this window as 'sidekiq window' whenever required.

## Creating a Job
Run the following command on your terminal
```bash
$ rails g job task_logger

create    test/jobs/task_logger_job_test.rb
create  app/jobs/task_logger_job.rb

```

You'll notice that it creates two files `task_logger_job.rb` inside
`app/jobs` directory and its corresponding test file `task_logger_job_test.rb`
inside `test/jobs` directory.

The job file should look like this
```ruby
class TaskLoggerJob < ApplicationJob
end
```

`ApplicationJob`, just is an abstract class where
we can define configurations for all the jobs that are defined
in our app. It inherits `ActiveJob::Base`.
In short, is analogous to `ApplicationRecord` that we have in case of models.

`ActiveJob` internally invokes a method named `perform`.
So this method is responsible for executing
the entire business logic of the job.
Let's add `perform` method inside our `TaskLoggerJob` class.

```ruby
class TaskLoggerJob < ApplicationJob
  def perform
    puts "TaskLoggerJob is performed"
  end
end
```

There you go! You've just defined a new job.

## Executing the Job

Open your Rails console using `rails c`.
Now as you'd expect we can execute the `perform`
method that we've defined inside `TaskLoggerJob`
just like any other instance method of a class.
So let's see if that works.
```ruby
TaskLoggerJob.new.perform
> "TaskLoggerJob is performed"
```

Great this works. But you might wonder how this `job`
is different from any other Ruby class.
The answer is that this class provides
an ability to enqueue this job to the backend queue.
Now in your Rails console, run the following

```ruby
TaskLoggerJob.perform_later
> Enqueued TaskLoggerJob
```

Notice the output here.
Instead of printing the message from `perform` method of the job,
it shows that the job is enqueued.
Now go to the sidekiq window where sidekiq is running.
You should observe that this job had run there and
the message `"TaskLoggerJob is performed"` is printed there.

Let's see what has happened here. We've called a method `perform_later`,
which is a class method available on every child class of `ActiveJob::Base`.
It internally instantiates the job instance and enqueues the job to the configured backend queue,
which in our case is sidekiq.
Once enqueued, sidekiq picks it upon availability and executes the perform method.
This is how we are able to run the jobs asynchronously using `perform_later` method.

We can also define when we want to run the job by using `set` option

```ruby
# By providing `wait_until` option, we are asking to not perform the job before the end of the day.
TaskLoggerJob.set(wait_until: Date.today.end_of_day).perform_later
```

```ruby
# By providing `wait` option we are here asking to perform after 1 minute.
TaskLoggerJob.set(wait: 1.minute).perform_later
```

## Active Job callbacks

There could be cases when you might want to execute
the `perform` method synchronously too.
An other way of doing so is calling `perform_now` method on the job's class.
```ruby
TaskLoggerJob.perform_now
"TaskLoggerJob is performed"
```

Is there any difference between behaviours of `perform` and `perform_now`?
The answer is yes. The method `perform_now` is wrapped by the Active Job callbacks.
Similar to controllers and models, we can define the following callbacks inside
our jobs
```msg
before_enqueue
around_enqueue
after_enqueue
before_perform
around_perform
after_perform
```

Let's add a `before_perform` and `after_perform` in our `TaskLoggerJob` class as follows.

```ruby
class TaskLoggerJob < ApplicationJob
  # ... existing code
  before_perform :print_before_perform_message
  after_perform :print_after_perform_message

  def print_before_perform_message
    puts "Printing from inside before_perform callback"
  end

  def print_after_perform_message
    puts "Printing from inside after_perform callback"
  end
end
```

Now reload Rails console and compare results between `perform` and `perform_now`

```ruby
TaskLoggerJob.perform
"TaskLoggerJob is performed"


TaskLoggerJob.perform_now
"Printing from inside before_perform callback"
"TaskLoggerJob is performed"
"Printing from inside after_perform callback"
```

If `perform_later` was instead of `perform_now`, all these messages would've got
printed in the sidekiq window instead of on Rails console as execution
will happen asynchronously.

The behaviour however will be different in case of `before_enqueue` and `after_enqueue` callbacks.
Since `perform_now` is run synchronously and there is no enqueueing of job,
defining these callbacks will have no effect when `perform_now` is used.

Let's verify this behaviour. Inside `TaskLoggerJob`, remove all existing callbacks
and add the following code

```ruby
class TaskLoggerJob < ApplicationJob
  before_enqueue :print_before_enqueue_message
  after_enqueue :print_after_enqueue_message

  def perform
    puts "TaskLoggerJob is performed"
  end

  def print_before_enqueue_message
    puts "Printing from inside before_enqueue callback"
  end

  def print_after_enqueue_message
      puts "Printing from inside after_enqueue callback"
  end
end
```

Run the following on Rails console

```ruby
TaskLoggerJob.perform_now
"TaskLoggerJob is performed"


TaskLoggerJob.perform_later
"Printing from inside before_perform callback"
```

You'll notice that the `before_enqueue` message has got printed only in case when `peform_later` was called.

## Using job to log ip address
Now let's use our `TaskLoggerJob` to actually log something.
Let's log the details of the task after the task had got created.
Add a `after_create` inside `app/models/task.rb` to

```ruby
class Task < ApplicationRecord
  after_create :log_task_details

  # Existing code ...

  def log_task_details
    TaskLoggerJob.perform_later(self)
  end
end
```

Notice that we have passed an argument to `perform_later` method.
The method `perform`, that we manually define inside the job can
take any number and any type of argument. In the above case,
we are considering a task record as an argument to `perform` action.

So let's clear all the actions that we have added in `TaskLoggerJob`
and define `perform` action as follows

```ruby
class TaskLoggerJob < ApplicationJob
  def perform(task)
    puts "Created a task with following attributes :: #{task.attributes}"
  end
end
```

Now create a task in the browser and
notice that the log is printed in the sidekiq window
printing all the attributes of the newly created task.

Let's make use of the queue adapters that we've defined
and send email notifications in our next chapter.
