#include <stdio.h>

int main(void)
{
	int a, b; 

	scanf("%d%d", &a, &b);

	int c = a; 

	a = b; 

	b = c; 

	printf("after swapping, a = %d, b = %d", a, b);

	return 0;
}
