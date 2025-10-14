const { test, expect } = require('@playwright/test');
const { spawn } = require('child_process');

test.describe('Worker Tests', () => {
  let workerProcess;

  test.beforeEach(async () => {
    // Start the worker process
    workerProcess = spawn('node', ['worker.js'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: process.cwd()
    });
    
    // Wait a moment for the worker to start
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  test.afterEach(async () => {
    // Clean up the worker process
    if (workerProcess) {
      workerProcess.kill();
      workerProcess = null;
    }
  });

  test('worker starts and outputs preview test message', async () => {
    return new Promise((resolve, reject) => {
      let output = '';
      
      workerProcess.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('Preview test')) {
          expect(output).toContain('Preview test');
          resolve();
        }
      });

      workerProcess.stderr.on('data', (data) => {
        reject(new Error(`Worker error: ${data.toString()}`));
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        reject(new Error('Worker did not output expected message within 5 seconds'));
      }, 5000);
    });
  });

  test('worker continues running and outputs messages periodically', async () => {
    return new Promise((resolve, reject) => {
      let messageCount = 0;
      
      workerProcess.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Preview test')) {
          messageCount++;
          if (messageCount >= 2) {
            expect(messageCount).toBeGreaterThanOrEqual(2);
            resolve();
          }
        }
      });

      workerProcess.stderr.on('data', (data) => {
        reject(new Error(`Worker error: ${data.toString()}`));
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('Worker did not output multiple messages within 10 seconds'));
      }, 10000);
    });
  });

  test('worker process is running', () => {
    expect(workerProcess).toBeTruthy();
    expect(workerProcess.pid).toBeTruthy();
  });
});
