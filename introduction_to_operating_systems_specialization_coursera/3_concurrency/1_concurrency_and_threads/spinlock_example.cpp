
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

class SpinLock {
private:
  std::atomic<bool> flag;

public:
  SpinLock() : flag(false) {}

  void lock() {
    bool expected = false;
    while (!flag.compare_exchange_strong(expected, true)) {
      expected = false;
    }
  }

  void unlock() { flag.store(false); }
};

void criticalSection(int threadID, SpinLock &spinLock) {
  std::cout << "Thread " << threadID << " attempting to acquire lock..."
            << std::endl;
  spinLock.lock();
  std::cout << "Thread " << threadID << " has acquired lock." << std::endl;
  std::cout << "Thread " << threadID << " is in critical section." << std::endl;
  spinLock.unlock();
  std::cout << "Thread " << threadID << " has released lock." << std::endl;
}

int main() {
  const int numThreads = 5;
  SpinLock spinLock;
  std::vector<std::thread> threads;

  for (int i = 0; i < numThreads; ++i) {
    threads.emplace_back(criticalSection, i, std::ref(spinLock));
  }

  for (auto &thread : threads) {
    thread.join();
  }

  return 0;
}
