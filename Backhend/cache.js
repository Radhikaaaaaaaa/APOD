const { LRUCache } = require("lru-cache");

function createCache() {
  return new LRUCache({
    max: 100,
    ttl: 1000 * 60 * 60, // 1 hour
  });
}

module.exports = createCache;
