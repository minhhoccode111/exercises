// See https://aka.ms/new-console-template for more information

// using System;
// using System.Linq;
// using System.IO;

namespace HelloWorld
{
    class Program
    {
        // field (or attribute)
        // string color = "red";

        // this is how we add document for our methods
        /// <summary>
        /// Sum two integers
        /// </summary>
        /// <param name="a">first integer</param>
        /// <param name="b">second integer</param>
        /// <returns>the sum of a and b</returns>
        static int PlusTwo(int a, int b)
        {
            return a + b;
        }

        static void Main(string[] args)
        {
            // Console.WriteLine("Main method is being called");

            // BasicTypes();
            // Variable();
            // TypeCasting();
            // UserInput();
            // OperatorsAndAssignmentOperators();
            // ComparisonOperators();
            // LogicalOperators();
            // Math();
            // Strings();
            // StringConcatenation();
            // StringInterpolation();
            // AccessStrings();
            // SpecialCharater();
            // Switch();
            // ForeachLoop();
            // SortArray();

            // ############ ABOUT METHODS ############

            // MyMethod(" " + "string 0");
            // MyMethod(" " + "string 1");
            // MyMethod(" " + "string 2");
            // MyMethodDefault("Hello, World!");
            // MyMethodDefault();
            // int result0 = MyMethodReturnInt(5);
            // int result1 = MyMethodReturnInt();
            // Console.WriteLine(result0);
            // Console.WriteLine(result1);
            // MyMethodNamedArguments(s3: "this is 3.", s2: "this is 2,", s1: "this is 1,");

            // int result2 = PlusMethod(3, 4);
            // double result3 = PlusMethod(3.1, 4.1);
            // Console.WriteLine(result2); // 7
            // Console.WriteLine(result3); // 7.19999999999?

            // // ############### OOP ###############
            // Program myObj0 = new Program();
            // Program myObj1 = new Program();
            // Program myObj2 = new Program();
            // Console.WriteLine(myObj0.color);
            // Console.WriteLine(myObj1.color);
            // Console.WriteLine(myObj2.color);

            // Racecar myObj3 = new Racecar();
            // Racecar myObj4 = new Racecar();
            // myObj3.colorPrimary = "black";
            // Console.WriteLine(myObj3.colorPrimary);
            // Console.WriteLine(myObj4.colorPrimary);
            // string str0 = myObj3.StartEngine();
            // Console.WriteLine(str0);

            // // create an object of the Racecar Class
            // // this will call the constructor
            // Fruit banana = new Fruit();
            // Console.WriteLine(banana.name);

            // Person person = new Person();
            // Console.WriteLine(person.Name);
            // person.Name = "Dang";
            // Console.WriteLine(person.Name);
            // person.Name = "Hoang";
            // Console.WriteLine(person.Name);
            // person.ShortName = "Minh";
            // Console.WriteLine(person.ShortName);

            // // create a myCar object
            // Car myCar = new Car();

            // // call the honk() method (from the Vehical class) on the myCar
            // // object
            // myCar.honk();

            // // display the value of the brand field (from the Vehicle class)
            // // and the value of the modelName from the Car class
            // Console.WriteLine(myCar.brand + " " + myCar.modelName);


            // Animal animal = new Animal();
            // Pig pig = new Pig();
            // Dog dog = new Dog();

            // animal.animalSound();
            // pig.animalSound();
            // dog.animalSound();

            // Pig0 myPig0 = new Pig0();
            // myPig0.animalSound(); // call the abstract method
            // myPig0.sleep(); // call the regular method

            // Pig1 myPig1 = new Pig1();
            // myPig1.animalSound();

            // DemoClass demo = new DemoClass();
            // demo.myMethod();
            // demo.myOtherMethod();

            // Level myVar = Level.Medium;
            // Console.WriteLine(myVar);

            // MyProgram number = new MyProgram();
            // int val = number.getLevel();
            // Console.WriteLine(val);

            // // WORK WITH FILES
            // string fileName = "filename.txt";
            // string writeText = "Hello, World!";
            // File.WriteAllText(fileName, writeText);
            // string readText = File.ReadAllText(fileName);
            // Console.WriteLine(readText);

            // try ... catch ... finally block
            try
            {
                // throw new Exception("Hello, World!");

                // int[] nums = { 1, 2, 3 };
                // Console.WriteLine(nums[100]);

                int rand = new Random().Next(1, 100);
                if (rand < 18)
                {
                    throw new ArithmeticException(
                        "Access denied - You must be at least 18 years old."
                    );
                }
                else
                {
                    Console.WriteLine("Access granted - You are old enough!");
                }

                return;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                // throw;
            }
            finally
            {
                Console.WriteLine("This will run even after the try block return");
                PlusTwo(1, 2);
            }
        }

        static void BasicTypes()
        {
            Console.WriteLine("BasicTypes is being called");

            Console.WriteLine(3 + 4);
            Console.Write("I will print on the same line.");
            Console.Write("\n"); // this a comment
            // this is a comment
            /* this is multi-line comment */
            int Integer0 = 1;
            Integer0 = 10;
            double Double = 11111111111111;
            Double = 222222222222222;
            char Char = 'a';
            Char = 'b';
            string String = "a";
            String = "bar";
            bool Bool = false;
            Bool = true;
            Console.WriteLine(Integer0);
            Console.WriteLine(Double);
            Console.WriteLine(Char);
            Console.WriteLine(String);
            Console.WriteLine(Bool);
            const int Integer1 = 2;
            const double Double1 = 2222222222222222222;
            const char Char1 = 'c';
            const string String1 = "c";
            const bool Bool1 = true;
            Console.WriteLine(3 + Integer1);
            Console.WriteLine(4 + Double1);
            Console.WriteLine(String1 + " what");
            Console.WriteLine(Char1 + 'c'); // 198
            Console.WriteLine(Bool1);
        }

        static void Variable()
        {
            Console.WriteLine("Variable method is being called.");

            double float0 = 1.20000000001;
            double float1 = 1.1;
            // only 6 or 7 after the '.'
            float float2 = 1.100001F;
            Console.WriteLine(float0 + float1);
            long long0 = 222222222222222;
            Console.WriteLine(float0);
            Console.WriteLine(float1);
            Console.WriteLine(float2);
            Console.WriteLine(long0);

            // e for power of 10
            float f0 = 35e3F;
            double d0 = 12e3D;
            Console.WriteLine(f0);
            Console.WriteLine(d0);
        }

        static void TypeCasting()
        {
            // Console.WriteLine("TypeCasting method is being called.");
            /*
            Implicit Casting (Automatically)
            converting a smaller type to a larger type size

            char -> int -> long -> float -> double
            */

            int myInt0 = 10;
            double myDouble0 = myInt0;
            Console.WriteLine(myInt0); // 10
            Console.WriteLine(myDouble0); // 10

            /*
            Explicit Casting (Manually)
            converting a larger type to a smaller size type

            double -> float -> long -> int -> char
            */

            double myDouble1 = 9.78;
            int myInt1 = (int)myDouble1;
            Console.WriteLine(myDouble1); // 9.78
            Console.WriteLine(myInt1); // 9

            // char only have 2 bytes which is 2^16
            char myChar = (char)(System.Math.Pow(2, 16) - 1);
            Console.WriteLine(myChar);

            /*
            Type Conversion Methods

            it is also possible to convert data types explicitly by using
            built-in methods, such as
            Convert.ToBoolean
            Convert.ToDouble
            Convert.ToString
            Convert.ToInt32(int)
            Convert.ToInt64(long)
            */

            int myInt = 10;
            double myDouble = 5.25;
            bool myBool = true;

            Console.WriteLine(Convert.ToString(myInt));
            Console.WriteLine(Convert.ToDouble(myInt));
            Console.WriteLine(Convert.ToInt32(myDouble));
            Console.WriteLine(Convert.ToString(myBool));
        }

        static void UserInput()
        {
            Console.WriteLine("UserInput is being called");

            Console.WriteLine("Enter username: ");
            try
            {
                string userName = Console.ReadLine();
                Console.WriteLine("Username is: " + userName);
            }
            catch (System.Exception)
            {
                Console.WriteLine("Cannot be empty");
            }

            Console.WriteLine("Enter user age: ");
            int userAge = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("User age is: ", userAge);

            // simple ask for yes/no program
            Console.WriteLine("Agree with term of services? y/n");
            char userAgree = Console.ReadLine()[0];
            while (userAgree != 'y' && userAgree != 'n')
            {
                Console.WriteLine("Agree with term of services? y/n");
                userAgree = Console.ReadLine()[0];
            }
            Console.WriteLine("User agreement: " + userAgree);
        }

        static void OperatorsAndAssignmentOperators()
        {
            Console.WriteLine("Operators is being called");

            int a = 1 + 2;
            int b = 1 - 2;
            int c = 1 / 2;
            int d = 1 * 2;
            int e = 1 % 2;
            int f = e++;
            int g = f--;
            int h = 5;
            h += 10;
            h -= 10;
            h /= 10;
            h *= 10;
            h %= 10;
            Console.WriteLine("init g belike: ");
            Console.WriteLine(h);
            h &= 10;
            Console.WriteLine("after g &= 10 belike: ");
            Console.WriteLine(h);
            h |= 10;
            Console.WriteLine("after g |= 10 belike: ");
            Console.WriteLine(h);
            h ^= 10;
            Console.WriteLine("after g ^= 10 belike: ");
            Console.WriteLine(h);
            h >>= 10;
            Console.WriteLine("after g >>= 10 belike: ");
            Console.WriteLine(h);
            h <<= 10;
            Console.WriteLine("after g <<= 10 belike: ");
            Console.WriteLine(h);
        }

        static void ComparisonOperators()
        {
            Console.WriteLine("ComparisonOperators is being called");

            Console.WriteLine(5 > 3);
            Console.WriteLine(5 < 3);
            Console.WriteLine(5 != 3);
            Console.WriteLine(5 == 3);
            Console.WriteLine(5 >= 3);
            Console.WriteLine(5 <= 3);
        }

        static void LogicalOperators()
        {
            Console.WriteLine("ComparisonOperators is being called");

            Console.WriteLine(5 > 3 && 3 < 5);
            Console.WriteLine(5 > 3 || 3 > 5);
            Console.WriteLine(!(5 < 3));
        }

        static void Math()
        {
            Console.WriteLine("Math is being called");

            Console.WriteLine(System.Math.Max(3, 5));

            Console.WriteLine(System.Math.Min(3, 5));

            Console.WriteLine(System.Math.Sqrt(25));

            Console.WriteLine(System.Math.Abs(-5));

            Console.WriteLine(System.Math.Round(9.99));
        }

        static void Strings()
        {
            Console.WriteLine("Strings is being called");

            string greetings = "Hello.";
            Console.WriteLine(greetings);

            string greetings2 = "Nice to meet you.";
            Console.WriteLine(greetings2);

            string txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            Console.WriteLine("The length of the txt string is: " + txt.Length);

            Console.WriteLine("1" + 2); // 12
            Console.WriteLine(1 + "2"); // 12
            Console.WriteLine(1 + '2'); // 51
            Console.WriteLine("1" == "1"); // True

            txt = "Hello, World!";
            Console.WriteLine(txt.ToUpper()); // HELLO, WORLD!
            Console.WriteLine(txt.ToLower()); // hello, world!
        }

        static void StringConcatenation()
        {
            Console.WriteLine("StringConcatenation is being called");

            string firstName = "Hoang";
            string lastName = "Minh";
            string name = firstName + " " + lastName;
            Console.WriteLine("Username belike: " + name);

            name = string.Concat(firstName, " ", lastName);
            Console.WriteLine("Username belike: " + name);
        }

        static void StringInterpolation()
        {
            Console.WriteLine("StringInterpolation is being called");

            string firstName = "Hoang";
            string lastName = "Minh";
            string greet = $"Hello, World From {firstName} {lastName}";
            Console.WriteLine(greet);
        }

        static void AccessStrings()
        {
            Console.WriteLine("AccessStrings is being called");

            string myString = "Hello";
            Console.WriteLine(myString[0]);
            Console.WriteLine(myString.IndexOf("H"));
            Console.WriteLine(myString.Substring(myString.IndexOf("e")));
        }

        static void SpecialCharater()
        {
            Console.WriteLine("SpecialCharater is being called");

            string txt = "We are the so-called \"Vikings\" from the north.";
            Console.WriteLine(txt);

            string txt0 = "this is a new line \n.";
            Console.WriteLine(txt0);
            string txt1 = "this is a tab \t.";
            Console.WriteLine(txt1);
            string txt2 = "this is a backspace\b.";
            Console.WriteLine(txt2);

            var rand = new Random();

            for (int i = 0; i < 100; i++)
            {
                // random an int between 0 and 10
                int next = rand.Next(0, 10);
                Console.WriteLine("i belike: " + i + " - random belike: " + next);
            }

            if (rand.Next() < 5)
            {
                Console.WriteLine("Less than 5");
            }
            else
            {
                Console.WriteLine("Greater than 5");
            }

            // short version
            string r = rand.Next() < 5 ? "Less than 5" : "Greater than 5";
            Console.WriteLine(r);
        }

        static void Switch()
        {
            Console.WriteLine("Switch is being called");

            var rand = new Random().Next(1, 8);
            switch (rand)
            {
                case 1:
                    Console.WriteLine("Sunday");
                    break;
                case 2:
                    Console.WriteLine("Monday");
                    break;
                case 3:
                    Console.WriteLine("Tuesday");
                    break;
                case 4:
                    Console.WriteLine("Wednesday");
                    break;
                case 5:
                    Console.WriteLine("Thursday");
                    break;
                case 6:
                    Console.WriteLine("Friday");
                    break;
                case 7:
                    Console.WriteLine("Saturday");
                    break;
                default:
                    Console.WriteLine("Error");
                    break;
            }
        }

        static void ForeachLoop()
        {
            // another scope
            {
                string[] cars = { "A", "B", "C", "D", "E" };
                foreach (string car in cars)
                {
                    Console.WriteLine(car);
                }
                Console.WriteLine(cars[3]);
                Console.WriteLine(cars.Length);
            }

            // create an array of 5 elements and add values later
            {
                int length = 5;
                int[] cars = new int[length];
                for (int i = 0; i < length; i++)
                {
                    cars[i] = i;
                }
            }

            // create an array of 4 elemens and add values right away
            {
                string[] cars = new string[4] { "A", "B", "C", "D" };
            }

            // create an array of 4 elemens without specifying the size
            {
                string[] cars = new string[] { "A", "B", "C", "D" };
            }

            // create an array of 4 elemens omitting the new keyword and
            // without specifying the size
            {
                string[] cars = { "A", "B", "C", "D" };
            }

            // if you declare an array and initialize it later, you have to use
            // the new keyword or an Error will be thrown
            {
                // declare
                string[] cars;

                // add values, using new
                cars = new string[] { "A", "B", "C", "D" };

                // this will throw an error
                // cars = { "A", "B", "C", "D" };
            }
        }

        static void SortArray()
        {
            Console.WriteLine("SortArray is being called");

            // sort a string
            string[] cars = { "D", "C", "B", "A" };
            Array.Sort(cars);
            foreach (string car in cars)
            {
                Console.WriteLine("car in cars belike: " + car);
            }

            // sort an int
            int[] nums = { 3, 2, 1, 0 };
            Array.Sort(nums);
            foreach (int num in nums)
            {
                Console.WriteLine("num in nums belike: " + num);
            }

            Console.WriteLine(nums.Max()); // 3
            Console.WriteLine(nums.Min()); // 0
            Console.WriteLine(nums.Sum()); // 6

            int[] n1 = { 0 }; // 1 dimension array
            int[,] n2 =
            {
                { 1, 2 },
                { 3, 4 }
            }; // 2 dimension array
            int[,,] n3 =
            {
                {
                    { 5, 6, 7 },
                    { 8, 9, 10 }
                },
                {
                    { 11, 12, 13 },
                    { 14, 15, 16 }
                }
            }; // 3 dimension array

            // access 1D array syntax
            Console.WriteLine(n1[0]); // 0
            // access 2D array syntax
            Console.WriteLine(n2[0, 1]); // 2
            // access 3D array syntax
            Console.WriteLine(n3[0, 1, 2]); // 14

            // loop through a 2D array with foreach
            foreach (int i in n2)
            {
                Console.WriteLine(i); // 1, 2, 3, 4
            }

            // loop through a 2D array with for loop
            for (int i = 0; i < n2.GetLength(0); i++)
            {
                for (int j = 0; j < n2.GetLength(1); j++)
                {
                    Console.WriteLine(n2[i, j]); // 1, 2, 3, 4
                }
            }
        }

        /*
        MyMethod is the name
        void mean the method have no return value
        static means that the method belongs to the class and not an object of
        the class
        */
        static void MyMethod(string extraString)
        {
            // code to be execute
            Console.WriteLine("This method just got executed!" + extraString);
        }

        static void MyMethodDefault(string extraString = "default string")
        {
            Console.WriteLine(extraString);
        }

        static int MyMethodReturnInt(int x = 10)
        {
            return new Random().Next(1, 10) + x;
        }

        static void MyMethodNamedArguments(string s1, string s2, string s3)
        {
            Console.WriteLine(s1 + " " + s2 + " " + s3);
        }

        // ############ OVERLOAD METHODS ############
        static int PlusMethod(int x, int y)
        {
            return x + y;
        }

        static double PlusMethod(double x, double y)
        {
            return x + y;
        }
    }
}
