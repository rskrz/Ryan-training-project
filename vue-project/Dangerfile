if github.branch_for_base == "master"
  if !(github.pr_title + github.pr_body).include?("#hotfix")
    if !git.diff_for_file("CHANGELOG.md")
      fail 'You did not update the CHANGELOG.md'
    end

    if !git.diff_for_file("Versionfile")
      fail 'You did not update the Versionfile'
    end
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