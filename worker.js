#!/usr/bin/env node

console.log('Preview test');

// Keep the process alive
setInterval(() => {
  console.log('Preview test');
}, 30000); // Log every 30 seconds
