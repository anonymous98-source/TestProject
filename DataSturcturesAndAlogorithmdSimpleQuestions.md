---

✅ Easy–Medium DSA Questions (5-minute solvable)

✅ 1. Reverse a String

Input: "hello"
Output: "olleh"

✅ One-liner in many languages


---

✅ 2. Check if a String is Palindrome

Input: "madam"
Output: true

Just compare characters from left & right.


---

✅ 3. Find Missing Number in 1..N

Input: [1, 2, 4, 5]
Output: 3

Formula:

missing = n*(n+1)/2 - sum(arr)


---

✅ 4. Find First Non-Repeating Character

Input: "aabbcddee"
Output: 'c'

Use frequency map.


---

✅ 5. Remove Duplicate Characters from String

Input: "banana"
Output: "ban"

Use Set to track seen chars.


---

✅ 6. Check if Two Strings Are Anagrams

Input: "listen", "silent"
Sort both → compare OR use frequency map.


---

✅ 7. Find Second Largest Element

Input: [5,1,9,2,7]
Output: 7

Track max & secondMax.


---

✅ 8. Merge Two Sorted Arrays

Example:

[1,3,5] + [2,4,6] → [1,2,3,4,5,6]

Two-pointer technique.


---

✅ 9. Count Frequency of Each Character

Input: "apple"
Output: {a=1, p=2, l=1, e=1}

Use HashMap.


---

✅ 10. Check Balanced Parentheses

Input: "{[()]}"
Output: true

Use stack.


---

✅ 11. Find Middle Element of Linked List

Use fast and slow pointers.


---

✅ 12. Detect Loop in LinkedList

Fast and slow pointers:

If they meet → loop exists



---

✅ 13. Find Intersection of Two Arrays

Use HashSet.


---

✅ 14. Move Zeros to End

Input: [1,0,6,0,3] → [1,6,3,0,0]

Two-pointer solution.


---

✅ 15. Fibonacci using DP

Avoid recursion stack overflow.


---

✅ 16. Check if Array Sorted

Traverse once.


---

✅ 17. Count Vowels in String

Check each character aeiou.


---

✅ 18. Sum of Digits

Example: 123 → 6


---

✅ 19. Print Prime Numbers Up To N

Simple sieve or loop.


---

✅ 20. Two Sum Problem

Given array and target, check if 2 numbers sum to target.
Use HashMap → O(n)



Awesome—here are short, copy-pasteable Java solutions for quick DSA problems (each ~5 mins). I included time/space notes and a tiny demo in main.

import java.util.*;

public class QuickDSA {

    // 1) Reverse a String
    static String reverse(String s) {
        char[] a = s.toCharArray();
        int i = 0, j = a.length - 1;
        while (i < j) { char t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }
        return new String(a);
    }
    // T: O(n), S: O(1)

    // 2) Palindrome String
    static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) if (s.charAt(i++) != s.charAt(j--)) return false;
        return true;
    }
    // T: O(n), S: O(1)

    // 3) Missing number in 1..n (array length n-1)
    static int missingNumber(int[] a, int n) {
        long sum = 0;
        for (int v : a) sum += v;
        long total = (long)n * (n + 1) / 2;
        return (int)(total - sum);
    }
    // T: O(n), S: O(1)

    // 4) First non-repeating character
    static Character firstNonRepeating(String s) {
        int[] freq = new int[256];
        for (char c : s.toCharArray()) freq[c]++;
        for (char c : s.toCharArray()) if (freq[c] == 1) return c;
        return null;
    }
    // T: O(n), S: O(1) (fixed alphabet)

    // 5) Remove duplicate characters (preserve order)
    static String removeDupChars(String s) {
        boolean[] seen = new boolean[256];
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) if (!seen[c]) { seen[c] = true; sb.append(c); }
        return sb.toString();
    }
    // T: O(n), S: O(1)

    // 6) Anagrams check
    static boolean areAnagrams(String a, String b) {
        if (a.length() != b.length()) return false;
        int[] cnt = new int[256];
        for (char c : a.toCharArray()) cnt[c]++;
        for (char c : b.toCharArray()) if (--cnt[c] < 0) return false;
        return true;
    }
    // T: O(n), S: O(1)

    // 7) Second largest element (distinct or not)
    static Integer secondLargest(int[] a) {
        Integer max = null, second = null;
        for (int v : a) {
            if (max == null || v > max) { second = max; max = v; }
            else if (v != max && (second == null || v > second)) second = v;
        }
        return second; // null if not present
    }
    // T: O(n), S: O(1)

    // 8) Merge two sorted arrays
    static int[] mergeSorted(int[] A, int[] B) {
        int i = 0, j = 0, k = 0;
        int[] C = new int[A.length + B.length];
        while (i < A.length && j < B.length) C[k++] = (A[i] <= B[j]) ? A[i++] : B[j++];
        while (i < A.length) C[k++] = A[i++];
        while (j < B.length) C[k++] = B[j++];
        return C;
    }
    // T: O(n+m), S: O(n+m)

    // 9) Char frequency map
    static Map<Character, Integer> freqMap(String s) {
        Map<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        return map;
    }
    // T: O(n), S: O(k)

    // 10) Balanced parentheses
    static boolean isBalanced(String s) {
        Map<Character, Character> pair = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (pair.containsValue(c)) st.push(c);
            else if (pair.containsKey(c)) {
                if (st.isEmpty() || st.pop() != pair.get(c)) return false;
            }
        }
        return st.isEmpty();
    }
    // T: O(n), S: O(n)

    // 11) Middle of linked list (fast/slow)
    static class Node { int val; Node next; Node(int v){val=v;} }
    static Node middle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        return slow;
    }
    // T: O(n), S: O(1)

    // 12) Detect loop in linked list (Floyd)
    static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    // T: O(n), S: O(1)

    // 13) Intersection of two arrays (unique)
    static int[] intersectUnique(int[] a, int[] b) {
        Set<Integer> s1 = new HashSet<>();
        for (int x : a) s1.add(x);
        Set<Integer> ans = new HashSet<>();
        for (int y : b) if (s1.contains(y)) ans.add(y);
        return ans.stream().mapToInt(i -> i).toArray();
    }
    // T: O(n+m), S: O(n+m)

    // 14) Move zeros to end (stable, in-place)
    static void moveZeros(int[] a) {
        int write = 0;
        for (int x : a) if (x != 0) a[write++] = x;
        while (write < a.length) a[write++] = 0;
    }
    // T: O(n), S: O(1)

    // 15) Two Sum (return indices; -1 if not found)
    static int[] twoSum(int[] a, int target) {
        Map<Integer, Integer> idx = new HashMap<>();
        for (int i = 0; i < a.length; i++) {
            int need = target - a[i];
            if (idx.containsKey(need)) return new int[]{idx.get(need), i};
            idx.put(a[i], i);
        }
        return new int[]{-1, -1};
    }
    // T: O(n), S: O(n)

    // --- Quick demo ---
    public static void main(String[] args) {
        System.out.println(reverse("hello"));                 // olleh
        System.out.println(isPalindrome("madam"));            // true
        System.out.println(missingNumber(new int[]{1,2,4,5}, 5)); // 3
        System.out.println(firstNonRepeating("aabbcddee"));   // c
        System.out.println(removeDupChars("banana"));         // ban
        System.out.println(areAnagrams("listen","silent"));   // true
        System.out.println(secondLargest(new int[]{5,1,9,2,7})); // 7
        System.out.println(Arrays.toString(mergeSorted(new int[]{1,3,5}, new int[]{2,4,6})));
        System.out.println(freqMap("apple"));                 // {a=1, p=2, l=1, e=1}
        System.out.println(isBalanced("{[()]}"));             // true
        Node h = new Node(1); h.next=new Node(2); h.next.next=new Node(3); h.next.next.next=new Node(4);
        System.out.println(middle(h).val);                    // 3
        System.out.println(hasCycle(h));                      // false
        System.out.println(Arrays.toString(intersectUnique(new int[]{1,2,2,3}, new int[]{2,3,4}))); // [2,3]
        int[] arr = {1,0,6,0,3}; moveZeros(arr); System.out.println(Arrays.toString(arr)); // [1,6,3,0,0]
        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9))); // [0,1]
    }
}
