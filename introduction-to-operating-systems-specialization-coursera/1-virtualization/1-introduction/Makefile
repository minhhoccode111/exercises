hello: hello.o helper.o
	gcc -o hello hello.o helper.o -lm

hello.o: hello.c
	gcc -c hello.c

helper.o: helper.c
	gcc -c helper.c

clean:
	rm -f hello.o helper.o hello
