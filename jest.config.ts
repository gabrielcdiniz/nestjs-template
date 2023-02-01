import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/modules/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.(t|j)s',
    '!main.(t|j)s',
    '!**/index.(t|j)s',
    '!**/decorators/**',
    '!**/dtos/*',
    '!**/*.dto.(t|j)s',
    '!**/*schema.(t|j)s',
    '!**/utils/tests/**/*.(t|j)s',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
