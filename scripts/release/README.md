# Release Scripts

Scripts for managing releases and validating release readiness.

## Scripts

### `release.js`
Automated release script that handles version bumping, changelog generation, and publishing.

**Usage:**
```bash
node scripts/release/release.js [version-type]
```

**Version Types:**
- `patch` - Bug fixes (1.0.0 → 1.0.1)
- `minor` - New features (1.0.0 → 1.1.0)  
- `major` - Breaking changes (1.0.0 → 2.0.0)

**Example:**
```bash
node scripts/release/release.js minor
```

### `validate-release.js`
Pre-release validation that checks build integrity, tests, documentation, and package configuration.

**Usage:**
```bash
node scripts/release/validate-release.js
```

## Release Process

1. **Validate** - Run pre-release checks
2. **Build** - Create production build
3. **Test** - Run full test suite
4. **Version** - Bump version and update changelog
5. **Publish** - Publish to npm registry
6. **Tag** - Create git tag and release

## Pre-Release Checklist

The validation script checks:
- ✅ All tests passing
- ✅ Build successful
- ✅ Documentation up to date
- ✅ No TypeScript errors
- ✅ Package.json configuration
- ✅ Changelog updated
- ✅ Git working directory clean

## Integration

Typically integrated into release workflow:

```json
{
  "scripts": {
    "prerelease": "node scripts/release/validate-release.js",
    "release": "node scripts/release/release.js",
    "release:patch": "node scripts/release/release.js patch",
    "release:minor": "node scripts/release/release.js minor",
    "release:major": "node scripts/release/release.js major"
  }
}
```