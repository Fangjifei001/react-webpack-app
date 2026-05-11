/**
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 实现 LRUCache 类：
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
 * 如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else {
      this.cache.set(key, value);
      if (this.cache.size > this.capacity) {
        const oldKey = this.cache.keys().next().value;
        this.cache.delete(oldKey);
      }
    }
  }
}

const lruCache = new LRUCache(5);

console.log(lruCache.get(1));
lruCache.put(1, 1);
lruCache.put(2, 2);
lruCache.put(3, 3);
lruCache.put(4, 4);

console.log(lruCache.get(3));

const LRUCache2 = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};

LRUCache2.prototype.get = function (key) {
  if (!this.cache.has(key)) {
    return -1;
  }
  const value = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, value);
  return value;
};

LRUCache2.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
    this.cache.set(key, value);
  } else {
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldKey = this.cache.keys().next().value;
      this.cache.delete(oldKey);
    }
  }
};

const lruCache2 = new LRUCache2(5);

console.log(lruCache2.get(1));
lruCache2.put(1, 1);
lruCache2.put(2, 2);
lruCache2.put(3, 3);
lruCache2.put(4, 4);

console.log(lruCache2.get(4));
