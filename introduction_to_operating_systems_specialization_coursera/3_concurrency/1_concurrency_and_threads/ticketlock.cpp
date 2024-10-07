
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

class TicketLock {
private:
  std::atomic<int> ticketCounter;
  std::atomic<int> turn;

public:
  TicketLock() : ticketCounter(0), turn(0) {}

  void lock() {
    int myTicket = ticketCounter.fetch_add(1); // Fetch-And-Add
    while (turn.load(std::memory_order_relaxed) != myTicket) {
      ; // Spin-wait
    }
  }

  void unlock() {
    turn.fetch_add(1); // Move to next ticket
  }
};

void criticalSection(int threadID, TicketLock &ticketLock) {
  std::cout << "Thread " << threadID << " attempting to acquire lock..."
            << std::endl;
  ticketLock.lock();
  std::cout << "Thread " << threadID << " has acquired lock." << std::endl;
  std::cout << "Thread " << threadID << " is in critical section." << std::endl;
  ticketLock.unlock();
  std::cout << "Thread " << threadID << " has released lock." << std::endl;
}

int main() {
  const int numThreads = 5;
  TicketLock ticketLock;
  std::vector<std::thread> threads;

  for (int i = 0; i < numThreads; ++i) {
    threads.emplace_back(criticalSection, i, std::ref(ticketLock));
  }

  for (auto &thread : threads) {
    thread.join();
  }

  return 0;
}
