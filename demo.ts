function bookIds(
  books: { bookid: number; borrowCount: number }[],
  k: number
): number[] {
  const sortedBooks = books.sort((a, b) => b.borrowCount - a.borrowCount);
  const topKBooks = sortedBooks.slice(0, k);
  return topKBooks.map((book) => book.bookid);
}

// Example usage:
const books = [
  { bookid: 1, borrowCount: 10 },
  { bookid: 2, borrowCount: 15 },
  { bookid: 3, borrowCount: 5 },
  { bookid: 4, borrowCount: 20 },
];
console.log(bookIds(books, 2)); // [4, 2]

type ListNode = {
  val: number;
  next: ListNode | null;
};
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    // If the link has cycle, finally the fast and slow will meet
    if (fast === slow) return true;
  }

  return false;
}
// Example usage:
const node1: ListNode = { val: 1, next: null };
const node2: ListNode = { val: 2, next: null };
node1.next = node2;
node2.next = node1; // Creates a cycle
console.log(hasCycle(node1)); // true
