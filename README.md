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

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions of all kinds are welcome, including bug reports, feature requests, and pull requests. For major changes, please open an issue first to discuss what you would like to change.