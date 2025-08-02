/**
 * Sum to N - Three Simple Implementations
 *
 * Calculates the sum of integers from 1 to n
 * Example: sum_to_n(5) = 1 + 2 + 3 + 4 + 5 = 15
 */

// ============================================================================
// IMPLEMENTATION A: Mathematical Formula
// ============================================================================
// Uses the formula: sum = n * (n + 1) / 2
// This is the fastest method - O(1) time complexity
var sum_to_n_a = function (n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
};

// ============================================================================
// IMPLEMENTATION B: Simple Loop
// ============================================================================
// Uses a for loop to add each number from 1 to n
// Simple and easy to understand - O(n) time complexity
var sum_to_n_b = function (n) {
  if (n <= 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// ============================================================================
// IMPLEMENTATION C: Recursion
// ============================================================================
// Uses recursion: sum(n) = n + sum(n-1)
// Elegant but uses more memory - O(n) time and space complexity
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

// ============================================================================
// TESTING
// ============================================================================

console.log('Testing sum_to_n_a (Formula):');
console.log('sum_to_n_a(5) =', sum_to_n_a(5)); // Should be 15
console.log('sum_to_n_a(10) =', sum_to_n_a(10)); // Should be 55
console.log('sum_to_n_a(1) =', sum_to_n_a(1)); // Should be 1
console.log('sum_to_n_a(0) =', sum_to_n_a(0)); // Should be 0

console.log('\nTesting sum_to_n_b (Loop):');
console.log('sum_to_n_b(5) =', sum_to_n_b(5)); // Should be 15
console.log('sum_to_n_b(10) =', sum_to_n_b(10)); // Should be 55
console.log('sum_to_n_b(1) =', sum_to_n_b(1)); // Should be 1
console.log('sum_to_n_b(0) =', sum_to_n_b(0)); // Should be 0

console.log('\nTesting sum_to_n_c (Recursion):');
console.log('sum_to_n_c(5) =', sum_to_n_c(5)); // Should be 15
console.log('sum_to_n_c(10) =', sum_to_n_c(10)); // Should be 55
console.log('sum_to_n_c(1) =', sum_to_n_c(1)); // Should be 1
console.log('sum_to_n_c(0) =', sum_to_n_c(0)); // Should be 0

console.log('\n=== TESTING WITH n = 100 ===');
console.log('Expected: 1 + 2 + 3 + ... + 100 = 5050');
console.log('sum_to_n_a(100) =', sum_to_n_a(100));
console.log('sum_to_n_b(100) =', sum_to_n_b(100));
console.log('sum_to_n_c(100) =', sum_to_n_c(100));
console.log(
  'All results match:',
  sum_to_n_a(100) === sum_to_n_b(100) && sum_to_n_b(100) === sum_to_n_c(100)
    ? '✓ YES'
    : '✗ NO'
);
