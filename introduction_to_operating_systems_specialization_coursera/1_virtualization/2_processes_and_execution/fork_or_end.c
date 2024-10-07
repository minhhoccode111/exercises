int fork_or_end() {
  int rc = fork();
  assert(rc >= 0);
  return rc;
}
