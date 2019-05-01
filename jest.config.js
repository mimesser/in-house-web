module.exports = {
   transform: {
      '^.+\\.js$': 'babel-jest',
   },
   testEnvironment: 'node',
   testURL: 'http://localhost/',
   moduleDirectories: ['src', 'node_modules'],
   moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/fileMock.js',
      '^(components|containers)$': '<rootDir>/config/jest/componentsMock.js',
      '^(store|\\.\\.)\\/selectors$': '<rootDir>/config/jest/selectorsMock.js',
      '^(store|\\.\\.)\\/actions$': '<rootDir>/config/jest/actionsMock.js',
   },
   setupFiles: ['<rootDir>/config/jest/setupTests.js'],
   modulePathIgnorePatterns: ['.bin'],
};
