# update-priority-action
Determine the priority of an update by the change in semantic version name.
If `new-version` has a newer patch version compared to `old-version`, the output is set to `low-priority-result`.
If `new-version` has a newer minor version compared to `old-version`, the output is set to `med-priority-result`.
If `new-version` has a newer major version compared to `old-version`, the output is set to `high-priority-result`.
Note that anything before and after major.minor.patch is currently ignored.

## Inputs

### `old-version`

**Required:** The old semver release name (e.g. 1.0.0).

### `new-version`

**Required:** The new semver release name (e.g. 1.0.1).

### `low-priority-result`

What to output if the new update is determined to be low priority. Default is 0

### `med-priority-result`

What to output if the new update is determined to be low priority. Default is 3

### `high-priority-result`

What to output if the new update is determined to be low priority. Default is 5

## Outputs

### `update-priority`

The determined update priority. Can be any of the `*-priority-result` inputs, or `undefined` if the versions are the same.
