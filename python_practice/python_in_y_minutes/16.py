# 7. advanced


# generator help you make lazy code
def double_numbers(interable):
    for i in interable:
        yield i + i


# generators are memory-efficient because they only load the data needed to process the next value in the iterable. This allows them to perform operations on otherwise prohibitively large value ranges
# note: `range` replaces `xrange` in python 3
for i in double_numbers(range(1, 900000000)):  # `range` is a generator
    print(i)
    if i >= 30:
        break

# just as you can create a list comprehension, you can create a generator
# comprehensions as well
values = (-x for x in [1, 2, 3, 4, 5])
for x in values:
    print(x)  # prints: -1, -2, -3, -4, -5 to console/terminal

# you can also cast a generator comprehension directly to a list
values = (-x for x in [1, 2, 3, 4, 5])
gen_to_list = list(values)
print(gen_to_list)  # [-1, -2, -3, -4, -5]

# decorators are a form of syntactic sugar
# they make code easier to read while accomplishing clunky syntax

# wrappers are one type of decorator
# they're really useful for adding logging to existing functions without needing to modify them


def log_function(func):
    def wrapper(*args, **kwargs):
        print("Entering function", func.__name__)
        result = func(*args, **kwargs)
        print("Exiting function", func.__name__)
        return result

    return wrapper


@log_function  # equivalent:
def my_function(x, y):  # def my_function(x,y):
    return x + y  # return x + y


# my_function = log_function(my_function)
# the decorator @log_function tells us as we begin reading the function definition
# for my_function that this function will be wrapped with log_function
# when function definitions are long, it can be hard to parse the non-decorated
# assignment at the end of the definition

my_function(1, 2)  # "Entering function my_function"
# "3"
# "Exiting function my_function"

# but there's a problem
# what happens if we try to get some information about my_function?

print(my_function.__name__)  # => 'wrapper'
print(
    my_function.__code__.co_argcount
)  # => 0. The argcount is 0 because both arguments in wrapper()'s signature are optional.

# Because our decorator is equivalent to my_function = log_function(my_function)
# we've replaced information about my_function with information from wrapper

# Fix this using functools

from functools import wraps


def log_function(func):
    @wraps(
        func
    )  # this ensures docstring, function name, arguments list, etc. are all copied
    # to the wrapped function - instead of being replaced with wrapper's info
    def wrapper(*args, **kwargs):
        print("Entering function", func.__name__)
        result = func(*args, **kwargs)
        print("Exiting function", func.__name__)
        return result

    return wrapper


@log_function
def my_function(x, y):
    return x + y


my_function(1, 2)  # => "Entering function my_function"
# => "3"
# => "Exiting function my_function"

print(my_function.__name__)  # => 'my_function'
print(my_function.__code__.co_argcount)  # => 2
