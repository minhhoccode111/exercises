# Basic C Coding on UNIX – Key Concepts

### 1. Hello World Program

- Importing libraries: Use `#include` to import standard libraries (e.g., `<stdio.h>`).
- Main Method: In C, the main method returns an `int` (different from Java or Python). This int is passed to the shell to indicate program status (0 means success).

### 2. Compilation

- To compile a file: `gcc hello.c`
- Use flags to specify executable names or warnings:
  - `gcc -o hello hello.c` (sets the executable name to `hello`)
  - `gcc -Wall hello.c` (enables warnings)

### 3. Execution

- Run compiled code: `./a.out` (or the specified executable name).
- Command-line arguments are passed after the executable (e.g., `./a.out A B C`).

### 4. Libraries and Linking

- Use `man <library>` to view the documentation of any function or library.
- For math-related functions, link the math library with the `-lm` flag (e.g., `gcc -o hello hello.c -lm`).

### 5. Multi-file Programs

- To compile multi-file programs:
  - `gcc -c hello.c` (creates `hello.o` object file)
  - `gcc -c helper.c` (creates `helper.o`)
  - `gcc -o hello hello.o helper.o -lm` (links them together)
- This process is usually automated with `make`.

### 6. Make

- `make` helps automate the build process with a Makefile.
- A simple Makefile rule:

  ```makefile
  target: prerequisites
    command
  ```

  Example:

  ```makefile
  hello: hello.o helper.o
    gcc -o hello hello.o helper.o -lm
  ```

- Use `make` to compile, and `make clean` to remove object files and executables.

### 7. Debugging

- Compile with the `-g` flag to enable debugging (`gcc -g -o buggy buggy.c`).
- Use `gdb buggy` to debug:
  - Type `run` to start the program.
  - Inspect variables with `print <var_name>`.
  - Exit gdb with `quit`.
