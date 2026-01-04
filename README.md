# NodePathUtil

NodePathUtil is a utility class designed to standardize path representations across different operating systems. It uses Linux-style paths as the common format to ensure consistency when working with paths from various platforms.

## Features

- Path separator normalization
- Absolute path detection
- Conversion from relative to absolute paths
- Conversion from absolute to relative paths
- Support for both Windows and Unix-based systems

## Installation

```bash
npm install @nojaja/pathutil
```

## Usage

```javascript
import { PathUtil } from '@nojaja/pathutil';

// Normalize path separators
const normalizedPath = PathUtil.normalizeSeparator('C:\\Users\\example\\Documents');
console.log(normalizedPath); // Output: C:/Users/example/Documents

// Check if path is absolute
const isAbsolute = PathUtil.isAbsolute('/home/user/documents');
console.log(isAbsolute); // Output: true

// Convert relative path to absolute path
const absolutePath = PathUtil.absolutePath('../documents', '/home/user');
console.log(absolutePath); // Output: /home/documents

// Convert absolute path to relative path
const relativePath = PathUtil.relativePath('/home/user/documents', '/home');
console.log(relativePath); // Output: user/documents
```

## API

### `PathUtil.normalizeSeparator(targetPath: string): string`

Normalizes path separators to Linux-style (forward slashes).

### `PathUtil.isAbsolute(targetPath: string): boolean`

Determines whether the given path is absolute.

### `PathUtil.absolutePath(targetPath: string, currentDirectory?: string): string`

Converts a relative path to an absolute path. If `currentDirectory` is not specified, it uses the current working directory.

### `PathUtil.relativePath(targetPath: string, currentDirectory?: string): string`

Converts an absolute path to a relative path. If `currentDirectory` is not specified, it uses the current working directory.

## Test Structure

This project includes both unit tests and integration tests to ensure reliability and correctness.

### Unit Tests

Unit tests validate individual methods in isolation using TypeScript source files:

```bash
npm test
```

- **Location**: `tests/PathUtil/`
- **Files**: `*.spec.js`
- **Configuration**: `jest.config.js`
- **Purpose**: Test source code logic with mocks and isolated test cases

### Integration Tests

Integration tests validate the bundled output that end users consume. These tests ensure that:

1. All public APIs are correctly exported from the bundle
2. No regression issues from the build process (e.g., missing exports)
3. Methods work correctly when accessed through the packaged library

```bash
npm run test:integration
```

- **Location**: `tests/integration/`
- **Files**: `*.test.js`
- **Configuration**: `jest.integration.config.js`
- **Purpose**: Test the actual bundled `dist/PathUtil.bundle.js` file as users will consume it

### Run All Tests

To run both unit and integration tests:

```bash
npm run test:all
```

### Test Development Workflow

```bash
# 1. Make changes to source code
# 2. Run unit tests to validate logic
npm test

# 3. Build the bundle
npm run build

# 4. Run integration tests to validate the bundled output
npm run test:integration

# 5. Or run all tests together
npm run test:all
```

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions of all kinds are welcome, including bug reports, feature requests, and pull requests. For major changes, please open an issue first to discuss what you would like to change.