const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  modulePaths: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  verbose: false,
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
