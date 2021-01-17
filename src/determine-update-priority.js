import { getInput, setOutput, info, warning, setFailed } from '@actions/core';
import { clean, parse } from 'semver';

export async function run() {
  // Get version strings
  const oldVersionStr = getInput('old-version', { required: true });
  const newVersionStr = getInput('new-version', { required: true });

  // Get update priorities
  const lowPriority = getInput('low-priority-result');
  const medPriority = getInput('med-priority-result');
  const highPriority = getInput('high-priority-result');

  // Parse version strings
  info('Parsing versions');
  const oldVersion = parse(clean(oldVersionStr));
  const newVersion = parse(clean(newVersionStr));

  // Check versions are valid
  if (!oldVersion) {
    setFailed(`Invalid old-version supplied; ${oldVersionStr}`);
    return;
  }
  if (!newVersion) {
    setFailed(`Invalid new-version supplied; ${newVersionStr}`);
    return;
  }

  // Determine the update priority
  info('Determining priority');
  let updatePriority;
  if (newVersion.patch > oldVersion.patch) {
    updatePriority = lowPriority;
  }
  if (newVersion.minor > oldVersion.minor) {
    updatePriority = medPriority;
  }
  if (newVersion.major > oldVersion.major) {
    updatePriority = highPriority;
  }

  if (!updatePriority) {
    warning('Versions are the same, no update required');
  }
  setOutput('update-priority', updatePriority);
}
