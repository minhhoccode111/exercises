void wait_or_end() {
  int rc = wait(NULL);
  assert(rc > 0);
}
