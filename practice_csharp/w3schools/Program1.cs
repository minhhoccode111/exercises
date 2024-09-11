class Racecar
{
    public string colorPrimary = "pink";
    static string colorSecondary = "red";

    /*
       a static methoc can be accessed without creating an object of the class
       while public methods can only be accessed by objects
    */

    // public
    public string StartEngine()
    {
        return "Car Engine started.";
    }

    // static
    static string EndEngine()
    {
        return "Car Engine ended.";
    }
}

//
class Fruit
{
    // create fields
    public string name;
    public string color;
    public int weight;

    /*
    |++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    |Modifier  |Description
    |public    |The code is accessible for all classes
    |private   |The code is only accessible within the same class
    |protected |The code is accessible within the same class, or in a class that
    |          |is inherited from that class. You will learn more about
    |          |inheritance in a later chapter
    |internal  |The code is only accessible within its own assembly, but not
    |          |from another assembly. You will learn more about this in a later
    |          |chapter
    |++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    */

    // private modifier
    private string privateField0 = "unknown";

    // public modifier
    public string publicField = "unknown";

    // by default all members of a class are private if you don't specify any
    // access modified
    string privateField1; // private
    string privateField2; // private

    /*
        create a class constructor for the Fruit class
        must match a class's name, cannot have a return type (void or int etc)
        constructor is called when the object is created
        all classes have constructor by default: if you do not create a class
        constructor yourself, c# creates one for you, however, then you are not
        able to set initial values for fields
    */

    public Fruit(string fruitName = "Banana", string fruitColor = "Yellow", int fruitWeight = 10)
    {
        name = fruitName;
        color = fruitColor;
        weight = fruitWeight;
        privateField0 = "private is accessible within the same class";
        privateField1 = "private is accessible within the same class";
        privateField2 = "private is accessible within the same class";
        publicField = "public is accessible for all classes";
    }
}

class Person
{
    private string? name = "default name"; // field

    public string? Name // property
    {
        get // get method
        {
            if (name == null)
            {
                return "default name";
            }
            return name;
        }
        set { name = value; } // set method
    }

    // short for get and set, but the 'get' have warning because string can be null
    public string? ShortName { get; set; }
}

// inheritance
class Vehicle
{
    public string brand = "Ford";

    public void honk()
    {
        Console.WriteLine("Tuut, tuut!");
    }
}

// use sealed if you don't want other classes to inherit from a class
sealed class Car : Vehicle // derived class (chidl)
{
    public string modelName = "Mustang"; // Car field
}

// polymorphism
class Animal // base class (parent)
{
    public virtual void animalSound()
    {
        Console.WriteLine("The animal makes a sound");
    }
}

class Pig : Animal // derived class (child)
{
    public override void animalSound()
    {
        Console.WriteLine("The pig says: wee wee");
    }
}

class Dog : Animal // derived class (child)
{
    public override void animalSound()
    {
        Console.WriteLine("The dog says: bow bow");
    }
}

/*
   abstract class: is a restricted class that cannot be used to create objects
   (to access it, it must be inherited from another class)
   abstract method: can only be used in an abstract class, and it does not have
   a body. the body is provided by the dereved class (inherited from)
*/

// Animal myObj = new Animal(); // will generate an error (cannot create an
// instance of the abstract class or interface 'Animal')
abstract class Animal0
{
    public abstract void animalSound();

    public void sleep()
    {
        Console.WriteLine("Zzz");
    }
}

// derived class (inherit from Animal)
class Pig0 : Animal0
{
    public override void animalSound()
    {
        // the body of animalSound is provided here
        Console.WriteLine("The pig says: wee wee");
    }
}

/*
INTERFACE
Like abstract classes, interfaces cannot be used to create objects (in the example above, it is not possible to create an "IAnimal" object in the Program class)

Interface methods do not have a body - the body is provided by the "implement" class

On implementation of an interface, you must override all of its methods

Interfaces can contain properties and methods, but not fields/variables

Interface members are by default abstract and public

An interface cannot contain a constructor (as it cannot be used to create objects)
*/
interface IAnimal
{
    void animalSound(); // interface method (does not have a body)
}

// Pig "implements" the IAnimal interface
class Pig1 : IAnimal
{
    public void animalSound()
    {
        // the body of animalSound() is provided here
        Console.WriteLine("The pig says: wee wee");
    }
}

interface IFirstInterface
{
    void myMethod(); // interface method
}

interface ISecondInterface
{
    void myOtherMethod(); // interface method
}

// implement multiple interfaces
class DemoClass : IFirstInterface, ISecondInterface
{
    public void myMethod()
    {
        Console.WriteLine("My Method is being called");
    }

    public void myOtherMethod()
    {
        Console.WriteLine("My Other Method is being called");
    }
}

/*
   ENUM
   an enum is a special 'class' that represents a group of constants
   (unchangable/read-only variables)
   to create an enum, use the enum keyword (instead of class or interface),
   and separate the enum items with a comma

   enum is short for 'enumerations', which means 'specifically listed'
*/
enum Level
{
    Low,
    Medium,
    High
}

/*
   you can also have an enum inside a class
*/
class MyProgram
{
    enum Level0
    {
        Low, // 0
        Medium, // 1
        High // 2
    }

    enum Level1
    {
        Low, // 0
        Medium = 2, // 2
        High, // 1
    }

    public int getLevel()
    {
        int myVar = (int)Level0.Medium;
        return myVar;
    }
}
