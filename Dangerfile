# File for the Danger bot: https://danger.systems/ruby/
# Used to inspect pull requests for us to prevent issues. 

ReleaseFile = Struct.new(:relative_file_path, :warn_or_fail, :deployment_instruction)

files_to_update_for_releases = [ # we will also check the version changed in Info.plist. Don't include here. 
  # Edit your Info.plist 
  ReleaseFile.new('CHANGELOG.md', 'fail', "Add a new changelog entry detailing for future developers what has been done in the app."),  
  ReleaseFile.new('Versionfile', 'fail', "Update the version in Versionfile.")
]

deployment_instructions = []
deployment_instructions += files_to_update_for_releases.map { |release_file| "#{release_file.relative_file_path}: #{release_file.deployment_instruction}" }

def determineIfRelease(files_to_update_for_releases)
  num_files_updated = 0

  files_to_update_for_releases.each { |release_file_array|
    release_file_relative_path = release_file_array[0]
    release_file_warn_or_fail = release_file_array[1]

    if git.diff_for_file(release_file_relative_path) 
      if num_files_updated == 0        
        message "🚀 I am going to assume that this *is a release* pull request because you have edited a file that would be updated for releases. 🚀 File: #{release_file_relative_path} edited."        
      end 

      num_files_updated += 1
    else
      if num_files_updated > 0 # We only want to actually warn or fail if you forgot a file. If this PR is not a release, don't bother. 
        fail_message = "You did not update #{release_file_relative_path}, but you updated at least one file"
        if release_file_warn_or_fail == 'warn'
          warn fail_message
        else 
          fail fail_message
        end 
      end 
    end 
  }
end 

if ENV["CI"] 
  if github.branch_for_base == "master"
    if !(github.pr_title + github.pr_body).include?("#hotfix")
      determineIfRelease(files_to_update_for_releases)      
    end
  end
  
  # Check for places where I call `.isLength({})` without also including `.isString()` for express-validator. 
  Dir.glob('app/**/*.js') do |js_file|
    File.open(js_file, chomp: true).read.each_line do |line|    
      if line.include?(".isLength(") && !line.include?(".isString(")
        fail "Bug!: #{line.strip!} \n\nYou wrote some code (I am assuming express-validator code) that uses `.isLength()` but did not include `.isString()`."
      end 
    end
  end

  # Check for places where I call `.isInt({})` without also including `.toInt()` for express-validator. 
  Dir.glob('app/**/*.js') do |js_file|
    File.open(js_file, chomp: true).read.each_line do |line|
      if line.include?(".isInt(") && !line.include?(".toInt()")
        fail "Bug!: #{line.strip!} \n\nYou wrote some code (I am assuming express-validator code) that uses `.isInt()` but did not include `.toInt()`."
      end 
    end
  end

  # Check for places where I call `check(` for express-validator. I want to instead use `body`, `query`, etc. More descriptive options. 
  Dir.glob('app/**/*.js') do |js_file|
    File.open(js_file, chomp: true).read.each_line do |line|
      if line.include?("check(")
        fail "Bug!: #{line.strip!} \n\nYou wrote some code (I am assuming express-validator code) that uses `check()`. Use [a more descriptive option](https://express-validator.github.io/docs/check-api.html) instead. "
      end 
    end
  end

  # I like using `it.only()` or `describe.only()` in jest test files to indicate I only want to run 1 suite of tests or 1 test at a time. However, we cannot have this merged into our codebase. 
  Dir.glob('test/**/*.js') do |js_file|
    File.open(js_file, chomp: true).read.each_line do |line|
      if line.include?("describe.only(") || line.include?("it.only(")
        fail "Bug!: #{line.strip!} \n\nRemove `.only()` from this test code so we run *all* tests in the test suite."
      end 
    end
  end
else 
  puts "It looks like you are looking for instructions on how to deploy your app, huh? Well, edit these files with these instructions: \n\n"
  puts deployment_instructions  
end 
