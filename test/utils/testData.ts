/**
 * Test data utilities
 *
 * This module provides helper functions
 * for generating dynamic test data.
 *
 * Purpose:
 * - Avoid conflicts between test runs
 * - Ensure test independence
 * - Prevent duplicate email registration errors
 */

/**
 * Generates unique user credentials for test execution.
 *
 * Email is created using current timestamp
 * to guarantee uniqueness.
 *
 * Password is static but valid
 * according to application requirements.
 */
export function generateUser() {

  const timestamp = Date.now();

  return {
    email: `testuser_${timestamp}@example.com`,
    password: 'Test12345'
  };

}
