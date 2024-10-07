
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

class LLSCLock {
private:
  std::atomic<int> flag;

public:
  LLSCLock() : flag(0) {}

  void lock() {
    while (true) {
      int expected = 0;
      // Load-Linked equivalent: load the value
      if (flag.load(std::memory_order_relaxed) == expected) {
        // Store-Conditional equivalent: attempt to store a new value
        if (flag.compare_exchange_strong(expected, 1)) {
          break; // Break if SC succeeds
        }
      }
    }
  }

  void unlock() { flag.store(0, std::memory_order_relaxed); }
};

void criticalSection(int threadID, LLSCLock &llscLock) {
  std::cout << "Thread " << threadID << " attempting to acquire lock..."
            << std::endl;
  llscLock.lock();
  std::cout << "Thread " << threadID << " has acquired lock." << std::endl;
  std::cout << "Thread " << threadID << " is in critical section." << std::endl;
  llscLock.unlock();
  std::cout << "Thread " << threadID << " has released lock." << std::endl;
}

int main() {
  const int numThreads = 5;
  LLSCLock llscLock;
  std::vector<std::thread> threads;

  for (int i = 0; i < numThreads; ++i) {
    threads.emplace_back(criticalSection, i, std::ref(llscLock));
  }

  for (auto &thread : threads) {
    thread.join();
  }

  return 0;
}
