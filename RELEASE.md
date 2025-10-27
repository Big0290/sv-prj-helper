# Release Process

This document outlines the release process for the SV Project Helper UI Library.

## Automated Releases

The project uses GitHub Actions for automated releases with semantic versioning and changelog generation.

### Triggering a Release

#### 1. Automatic Release (Recommended)
Push commits to the `main` branch with conventional commit messages:

```bash
# For patch releases (bug fixes)
git commit -m "fix: resolve button styling issue"

# For minor releases (new features)
git commit -m "feat: add new tooltip component"

# For major releases (breaking changes)
git commit -m "feat!: redesign component API"
# or
git commit -m "feat: redesign component API

BREAKING CHANGE: The component props have been restructured"
```

#### 2. Manual Release via GitHub Actions
1. Go to the Actions tab in GitHub
2. Select "Publish to GitHub Packages"
3. Click "Run workflow"
4. Choose the release type (patch, minor, major)
5. Click "Run workflow"

### Release Types

- **Patch** (0.0.X): Bug fixes, documentation updates, small improvements
- **Minor** (0.X.0): New features, backwards compatible changes
- **Major** (X.0.0): Breaking changes, major API changes

## Manual Releases

For manual releases from your local machine:

```bash
# Patch release
npm run release:patch

# Minor release
npm run release:minor

# Major release
npm run release:major
```

### Prerequisites for Manual Releases

1. Clean working directory (no uncommitted changes)
2. On the `main` branch
3. All tests passing
4. Up-to-date with remote

## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples
```bash
feat: add dark mode support
fix: resolve accessibility issue in button component
docs: update installation instructions
feat!: redesign component API

BREAKING CHANGE: Component props have been restructured
```

## Changelog

The changelog is automatically generated based on conventional commits and follows the [Keep a Changelog](https://keepachangelog.com/) format.

### Manual Changelog Updates
If you need to manually update the changelog:

```bash
npm run changelog
```

## GitHub Package Registry

The package is published to GitHub Package Registry at:
```
@big0290/sv-prj-helper-ui
```

### Installation
```bash
npm install @big0290/sv-prj-helper-ui
```

## Release Checklist

### Pre-release
- [ ] All tests are passing
- [ ] Documentation is up to date
- [ ] Breaking changes are documented
- [ ] Version number is appropriate for changes

### During Release
- [ ] Changelog is generated/updated
- [ ] Version is bumped correctly
- [ ] Git tag is created
- [ ] Package is built successfully
- [ ] Package is published to registry

### Post-release
- [ ] GitHub release is created
- [ ] Documentation site is updated
- [ ] Release notes are communicated
- [ ] Dependencies are updated if needed

## Troubleshooting

### Failed Releases
If a release fails:

1. Check the GitHub Actions logs
2. Ensure all tests are passing
3. Verify package.json configuration
4. Check GitHub token permissions

### Rollback
To rollback a release:

1. Delete the git tag: `git tag -d vX.X.X && git push origin :refs/tags/vX.X.X`
2. Revert the version commit: `git revert <commit-hash>`
3. Unpublish the package version (if possible)

### Package Registry Issues
If publishing to GitHub Packages fails:

1. Verify the `publishConfig` in package.json
2. Check GitHub token permissions
3. Ensure the package name matches the repository

## Support

For questions about the release process, please:
1. Check this documentation
2. Review the GitHub Actions workflows
3. Open an issue with the `release` label