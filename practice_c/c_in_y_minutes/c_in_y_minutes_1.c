#include <stdio.h>

int main(void) {
  int i1 = 1, i2 = 2;
  float f1 = 1.0, f2 = 2.0;

  int b, c;
  b = c = 0;

  // i1 + i2; // => 3
  // i2 - i1; // => 1
  // i2 * i1; // => 2
  // i1 / i2; // => 0 (0.5, but truncated towards 0)

  // (float)i1 / i2; // => 0.5f
  // i1 / (double)i2; // => 0.5 // Same with double
  // f1 / f2; // => 0.5, plus or minus epsilon

  // Floating-point numbers are defined by IEEE 754, thus cannot store perfectly
  // exact values. For instance, the following does not produce expected results
  // because 0.1 might actually be 0.099999999999 inside the computer, and 0.3
  // might be stored as 0.300000000001.
  // (0.1 + 0.1 + 0.1) != 0.3; // => 1 (true)
  // and it is NOT associative due to reasons mentioned above.
  // 1 + (1e123 - 1e123) != (1 + 1e123) - 1e123; // => 1 (true)
  // this notation is scientific notations for numbers: 1e123 = 1*10^123

  // // Modulo is there as well, but be careful if arguments are negative
  // 11 % 3;    // => 2 as 11 = 2 + 3*x (x=3)
  // (-11) % 3; // => -2, as one would expect
  // 11 % (-3); // => 2 and not -2, and it's quite counter intuitive

  // // C is not Python - comparisons do NOT chain.
  // // Warning: The line below will compile, but it means `(0 < a) < 2`.
  // // This expression is always true, because (0 < a) could be either 1 or 0.
  // // In this case it's 1, because (0 < 1).
  // int between_0_and_2 = 0 < a < 2;
  // // Instead use:
  // int between_0_and_2 = 0 < a && a < 2;

  // // Logic works on ints
  // !3; // => 0 (Logical not)
  // !0; // => 1
  // 1 && 1; // => 1 (Logical and)
  // 0 && 1; // => 0
  // 0 || 1; // => 1 (Logical or)
  // 0 || 0; // => 0

  // Conditional ternary expression ( ? : )
  // z = (e > f) ? e : f; // => 10 "if e > f return e, else return f."

  // // Bitwise operators!
  // ~0x0F; // => 0xFFFFFFF0 (bitwise negation, "1's complement", example result
  // for 32-bit int) 0x0F & 0xF0; // => 0x00 (bitwise AND) 0x0F | 0xF0; // =>
  // 0xFF (bitwise OR) 0x04 ^ 0x0F; // => 0x0B (bitwise XOR) 0x01 << 1; // =>
  // 0x02 (bitwise left shift (by 1)) 0x02 >> 1; // => 0x01 (bitwise right shift
  // (by 1))

  // // Bitwise operators!
  // ~0x0F; // => 0xFFFFFFF0 (bitwise negation, "1's complement", example result
  // for 32-bit int) 0x0F & 0xF0; // => 0x00 (bitwise AND) 0x0F | 0xF0; // =>
  // 0xFF (bitwise OR) 0x04 ^ 0x0F; // => 0x0B (bitwise XOR) 0x01 << 1; // =>
  // 0x02 (bitwise left shift (by 1)) 0x02 >> 1; // => 0x01 (bitwise right shift
  // (by 1))

  // Be careful when shifting signed integers - the following are undefined:
  // - shifting into the sign bit of a signed integer (int a = 1 << 31)
  // - left-shifting a negative number (int a = -1 << 2)
  // - shifting by an offset which is >= the width of the type of the LHS:
  //   int a = 1 << 32; // UB if int is 32 bits wide

  typedef enum { false, true } bool;

  for (int i = 0; i < 10; i++) {
    if (i == 5)
      goto error;
  }
error: // this is like loop label

  return 0;
}

int type_casting(void) {

  // // Every value in C has a type, but you can cast one value into another
  // type
  // // if you want (with some constraints).
  // int x_hex = 0x01; // You can assign vars with hex literals
  //                   // binary is not in the standard, but allowed by some
  //                   // compilers (x_bin = 0b0010010110)
  // // Casting between types will attempt to preserve their numeric values
  // printf("%d\n", x_hex); // => Prints 1
  // printf("%d\n", (short) x_hex); // => Prints 1
  // printf("%d\n", (char) x_hex); // => Prints 1

  // // If you assign a value greater than a types max val, it will rollover
  // // without warning.
  // printf("%d\n",
  //        (unsigned char)257); // => 1 (Max char = 255 if char is 8 bits long)

  // For determining the max value of a `char`, a `signed char` and an `unsigned
  // char`, respectively, use the CHAR_MAX, SCHAR_MAX and UCHAR_MAX macros from
  // <limits.h>

  // // Integral types can be cast to floating-point types, and vice-versa.
  // printf("%f\n", (double) 100); // %f always formats a double...
  // printf("%f\n", (float)  100); // ...even with a float.
  // printf("%d\n", (char)100.0);

  return 0;
}

void pointers(void) {
  // A pointer is a variable declared to store a memory address. Its declaration
  // will also tell you the type of data it points to. You can retrieve the
  // memory address of your variables, then mess with them.

  // int x = 0;
  // printf("%p\n", (void *)&x); // Use & to retrieve the address of a variable
  // // (%p formats an object pointer of type void *)
  // // => Prints some address in memory;

  // // Pointers start with * in their declaration
  // int *px, not_a_pointer; // px is a pointer to an int
  // px = &x; // Stores the address of x in px
  // printf("%p\n", (void *)px); // => Prints some address in memory
  // printf("%zu, %zu\n", sizeof(px), sizeof(not_a_pointer));
  // // => Prints "8, 4" on a typical 64-bit system

  // // To retrieve the value at the address a pointer is pointing to,
  // // put * in front to dereference it.
  // // Note: yes, it may be confusing that '*' is used for _both_ declaring a
  // // pointer and dereferencing it.
  // printf("%d\n", *px); // => Prints 0, the value of x

  // // You can also change the value the pointer is pointing to.
  // // We'll have to wrap the dereference in parenthesis because
  // // ++ has a higher precedence than *.
  // (*px)++; // Increment the value px is pointing to by 1
  // printf("%d\n", *px); // => Prints 1
  // printf("%d\n", x); // => Prints 1

  // // You can also dynamically allocate contiguous blocks of memory with the
  // // standard library function malloc, which takes one argument of type
  // size_t
  // // representing the number of bytes to allocate (usually from the heap,
  // although this
  // // may not be true on e.g. embedded systems - the C standard says nothing
  // about it). int *my_ptr = malloc(sizeof(*my_ptr) * 20); for (xx = 0; xx <
  // 20; xx++) {
  //   *(my_ptr + xx) = 20 - xx; // my_ptr[xx] = 20-xx
  // } // Initialize memory to 20, 19, 18, 17... 2, 1 (as ints)

  // // Be careful passing user-provided values to malloc! If you want
  // // to be safe, you can use calloc instead (which, unlike malloc, also zeros
  // out the memory) int* my_other_ptr = calloc(20, sizeof(int));

  // // Note that there is no standard way to get the length of a
  // // dynamically allocated array in C. Because of this, if your arrays are
  // // going to be passed around your program a lot, you need another variable
  // // to keep track of the number of elements (size) of an array. See the
  // // functions section for more info.
  // size_t size = 10;
  // int *my_arr = calloc(size, sizeof(int));
  // // Add an element to the array
  // size++;
  // my_arr = realloc(my_arr, sizeof(int) * size);
  // if (my_arr == NULL) {
  //   //Remember to check for realloc failure!
  //   return
  // }
  // my_arr[10] = 5;

  // // Dereferencing memory that you haven't allocated gives
  // // "unpredictable results" - the program is said to invoke "undefined
  // behavior" printf("%d\n", *(my_ptr + 21)); // => Prints who-knows-what? It
  // may even crash.

  // // Strings are arrays of char, but they are usually represented as a
  // // pointer-to-char (which is a pointer to the first element of the array).
  // // It's good practice to use `const char *' when referring to a string
  // literal,
  // // since string literals shall not be modified (i.e. "foo"[0] = 'a' is
  // ILLEGAL.) const char *my_str = "This is my very own string literal";
  // printf("%c\n", *my_str); // => 'T'

  // // This is not the case if the string is an array
  // // (potentially initialized with a string literal)
  // // that resides in writable memory, as in:
  // char foo[] = "foo";
  // foo[0] = 'a'; // this is legal, foo now contains "aoo"

  return;
}

void about_function(void) {
  /*
  Functions are call by value. When a function is called, the arguments passed
  to the function are copies of the original arguments (except arrays). Anything
  you do to the arguments in the function do not change the value of the
  original argument where the function was called.

  Use pointers if you need to edit the original argument values (arrays are
  always passed in as pointers).

  Example: in-place string reversal
  */

  return;
}

// // A void function returns no value
// void str_reverse(char *str_in)
// {
//   char tmp;
//   size_t ii = 0;
//   size_t len = strlen(str_in); // `strlen()` is part of the c standard
//   library
//                                // NOTE: length returned by `strlen` DOESN'T
//                                //       include the terminating NULL byte
//                                ('\0')
//   // in C99 and newer versions, you can directly declare loop control
//   variables
//   // in the loop's parentheses. e.g., `for (size_t ii = 0; ...`
//   for (ii = 0; ii < len / 2; ii++) {
//     tmp = str_in[ii];
//     str_in[ii] = str_in[len - ii - 1]; // ii-th char from end
//     str_in[len - ii - 1] = tmp;
//   }
// }

void swapTwoNumbers(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

// Return multiple values.
// C does not allow for returning multiple values with the return statement. If
// you would like to return multiple values, then the caller must pass in the
// variables where they would like the returned values to go. These variables
// must be passed in as pointers such that the function can modify them.
int return_multiple(int *array_of_3, int *ret1, int *ret2, int *ret3) {
  if (array_of_3 == NULL)
    return 0; // return error code (false)

  // de-reference the pointer so we modify its value
  *ret1 = array_of_3[0];
  *ret2 = array_of_3[1];
  *ret3 = array_of_3[2];

  return 1; // return error code (true)
}

/*
With regards to arrays, they will always be passed to functions
as pointers. Even if you statically allocate an array like `arr[10]`,
it still gets passed as a pointer to the first element in any function calls.
Again, there is no standard way to get the size of a dynamically allocated
array in C.
*/
// Size must be passed!
// Otherwise, this function has no way of knowing how big the array is.
void printIntArray(int *arr, size_t size) {
  int i;
  for (i = 0; i < size; i++) {
    printf("arr[%d] is: %d\n", i, arr[i]);
  }
}

// if referring to external variables outside function, you should use the
// extern keyword.
int i = 0;
void testFunc() {
  extern int i; // i here is now using external variable i
}

// make external variables private to source file with static:
static int j = 0; // other files using testFunc2() cannot access variable j
void testFunc2() {
  //
  extern int j;
}

// The static keyword makes a variable inaccessible to code outside the
// compilation unit. (On almost all systems, a "compilation unit" is a .c
// file.) static can apply both to global (to the compilation unit) variables,
// functions, and function-local variables. When using static with
// function-local variables, the variable is effectively global and retains its
// value across function calls, but is only accessible within the function it
// is declared in. Additionally, static variables are initialized to 0 if not
// declared with some other starting value.
//**You may also declare functions as static to make them private**

// User-defined types and structs

// Typedefs can be used to create type aliases
typedef int my_type;
my_type my_type_var = 0;

// Structs are just collections of data, the members are allocated sequentially,
// in the order they are written:
struct rectangle {
  int width;
  int height;
};
// It's not generally true that
// sizeof(struct rectangle) == sizeof(int) + sizeof(int)
// due to potential padding between the structure members (this is for alignment
// reasons). [1]

void function_1() {
  struct rectangle my_rec = {1, 2}; // Fields can be initialized immediately

  // Access struct members with .
  my_rec.width = 10;
  my_rec.height = 20;

  // You can declare pointers to structs
  struct rectangle *my_rec_ptr = &my_rec;

  // Use dereferencing to set struct pointer members...
  (*my_rec_ptr).width = 30;

  // ... or even better: prefer the -> shorthand for the sake of readability
  my_rec_ptr->height = 10; // Same as (*my_rec_ptr).height = 10;
}

// TODO: function pointer

/*
At run time, functions are located at known memory addresses. Function pointers
are much like any other pointer (they just store a memory address), but can be
used to invoke functions directly, and to pass handlers (or callback functions)
around. However, definition syntax may be initially confusing.

Example: use str_reverse from a pointer
*/

// void str_reverse_through_pointer(char *str_in) {
//   // Define a function pointer variable, named f.
//   void (*f)(char *); // Signature should exactly match the target function.
//   f = &str_reverse; // Assign the address for the actual function (determined
//   at
//                     // run time)
//   // f = str_reverse; would work as well - functions decay into pointers,
//   // similar to arrays
//   (*f)(str_in); // Just calling the function through the pointer
//   // f(str_in); // That's an alternative but equally valid syntax for calling
//   // it.
// }

/*
As long as function signatures match, you can assign any function to the same
pointer. Function pointers are usually typedef'd for simplicity and readability,
as follows:
*/

typedef void (*my_fnp_type)(char *);

// Then used when declaring the actual pointer variable:
// ...
// my_fnp_type f;

/////////////////////////////
// Printing characters with printf()
/////////////////////////////

// Special characters:
/*
'\a'; // alert (bell) character
'\n'; // newline character
'\t'; // tab character (left justifies text)
'\v'; // vertical tab
'\f'; // new page (form feed)
'\r'; // carriage return
'\b'; // backspace character
'\0'; // NULL character. Usually put at end of strings in C.
//   hello\n\0. \0 used by convention to mark end of string.
'\\'; // backslash
'\?'; // question mark
'\''; // single quote
'\"'; // double quote
'\xhh'; // hexadecimal number. Example: '\xb' = vertical tab character
'\0oo'; // octal number. Example: '\013' = vertical tab character

//print formatting:
"%d";    // integer
"%3d";   // integer with minimum of length 3 digits (right justifies text)
"%s";    // string
"%f";    // float
"%ld";   // long
"%3.2f"; // minimum 3 digits left and 2 digits right decimal float
"%7.4s"; // (can do with strings too)
"%c";    // char
"%p";    // pointer. NOTE: need to (void *)-cast the pointer, before passing
         //                it as an argument to `printf`.
"%x";    // hexadecimal
"%o";    // octal
"%%";    // prints %
*/

///////////////////////////////////////
// Order of Evaluation
///////////////////////////////////////

// From top to bottom, top has higher precedence
//---------------------------------------------------//
//        Operators                  | Associativity //
//---------------------------------------------------//
// () [] -> .                        | left to right //
// ! ~ ++ -- + = *(type) sizeof      | right to left //
// * / %                             | left to right //
// + -                               | left to right //
// << >>                             | left to right //
// < <= > >=                         | left to right //
// == !=                             | left to right //
// &                                 | left to right //
// ^                                 | left to right //
// |                                 | left to right //
// &&                                | left to right //
// ||                                | left to right //
// ?:                                | right to left //
// = += -= *= /= %= &= ^= |= <<= >>= | right to left //
// ,                                 | left to right //
//---------------------------------------------------//

/******************************* Header Files **********************************

Header files are an important part of C as they allow for the connection of C
source files and can simplify code and definitions by separating them into
separate files.

Header files are syntactically similar to C source files but reside in ".h"
files. They can be included in your C source file by using the precompiler
command #include "example.h", given that example.h exists in the same directory
as the C file.
*/

/* A safe guard to prevent the header from being defined too many times. This */
/* happens in the case of circle dependency, the contents of the header is    */
/* already defined.                                                           */
// #ifndef EXAMPLE_H /* if EXAMPLE_H is not yet defined. */
// #define EXAMPLE_H /* Define the macro EXAMPLE_H. */

/* Other headers can be included in headers and therefore transitively */
/* included into files that include this header.                       */
#include <string.h>

/* Like for c source files, macros can be defined in headers */
/* and used in files that include this header file.          */
#define EXAMPLE_NAME "Dennis Ritchie"

/* Function macros can also be defined.  */
#define ADD(a, b) ((a) + (b))

/* Notice the parenthesis surrounding the arguments -- this is important to   */
/* ensure that a and b don't get expanded in an unexpected way (e.g. consider */
/* MUL(x, y) (x * y); MUL(1 + 2, 3) would expand to (1 + 2 * 3), yielding an  */
/* incorrect result)                                                          */

/* Structs and typedefs can be used for consistency between files. */
typedef struct Node {
  int val;
  struct Node *next;
} Node;

/* So can enumerations. */
enum traffic_light_state { GREEN, YELLOW, RED };

/* Function prototypes can also be defined here for use in multiple files,  */
/* but it is bad practice to define the function in the header. Definitions */
/* should instead be put in a C file.                                       */
Node createLinkedList(int *vals, int len);

/* Beyond the above elements, other definitions should be left to a C source */
/* file. Excessive includes or definitions should also not be contained in   */
/* a header file but instead put into separate headers or a C file.          */

// #endif /* End of the if precompiler directive. */
