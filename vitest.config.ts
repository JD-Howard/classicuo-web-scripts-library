import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like describe and it
    environment: 'node', 
    include: ['tests/**/*.test.ts'], 
    setupFiles: ['./tests/_setup.ts'], 
  },
});
