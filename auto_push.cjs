const { execSync } = require('child_process');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    return false;
  }
}

function autoPush() {
  const args = process.argv.slice(2);
  const commitMessage = args.length > 0 
    ? args.join(' ') 
    : `Auto commit: ${new Date().toLocaleString()}`;

  console.log('Adding changes...');
  runCommand('git add .');

  console.log(`Committing changes with message: "${commitMessage}"...`);
  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.log('Nothing to commit or error committing.');
    return;
  }

  console.log('Pushing to remote...');
  if (!runCommand('git push')) {
      console.log('Initial push failed, attempting to set upstream branch...');
      runCommand('git push -u origin HEAD');
  }
  console.log('Done!');
}

autoPush();
