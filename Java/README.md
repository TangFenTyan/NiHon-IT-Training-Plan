# JAVA

## (01)Java介绍

### JDK & JRE
* **JRE**：Java Runtime Environment （Java 运行时环境）
  * JRE包括Java虚拟机（Java Virtual Machine，JVM），以及 Java 平台核心类和基础 Java 平台库；通过 JVM 才能在电脑系统执行 Java 应用程序（Java Application）
* **JDK**：Java Development Kit （Java 开发工具包）
  * JDK 是 JRE 的超集，包含 JRE 的所有内容，以及开发小程序和应用程序所需的工具，例如编译器和调试器

### 自动垃圾回收（Garbage Collection）
* Java中对象的创建和放置都是在存储器堆栈上面进行
* 当一个对象没有任何引用的时候，Java的自动垃圾收集机制就发挥作用，自动删除这个对象所占用的空间，释放存储器以避免存储器泄漏
* 而在常规语言例如C++，程序员必须确保已分配的内存被释放。防止造成内存泄漏的麻烦
* 不同厂商、不同版本的JVM中的存储器垃圾回收机制并不完全一样，通常越新版本的存储器回收机制越快

## (03)Java HelloWorld

### HelloWorld
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
> public：表示这个类是公开的 \
> class：表示类的意思 \
  > public 和 class 是 Java 中的关键字须小写 \
> HelloWorld：表示类名 \
  > 注意:文件名须与类名同名(区分大小写),通常类名以大写字母开头 \
> {}中的内容为类的定义 \
> main方法：Java 程序的固定入口方法 \
  > public：表示方法是公开的 \
  > static：表示方法是静态的 \
  > void：表示方法的返回类型为void \
  > String[]：表示参数的类型 \
  > args：表示参数的名称 \

## (04)Java 注释

### 注释
* 文档注释和多行注释的作用基本相同，唯一的区别是文档注释可以使用javadoc命令生成文档
```java
/**
  *文档注释
*/
```

### 生成JavaDoc
* Tool-Generate JavaDoc-Output directory-Command line arguments: "-encoding UTF-8"-Generate

## (05)Java 标识符
* Java语言中，对于变量，常量，函数，语句块也有名字，我们统统称之为Java标识符，通常由字母和数字以及其它字符构成

### 标识符规范
* 标识符可以以字母[A-Za-z]，美元符号$或下划线_开始
* 首字母后可以是字母、数字、下划线的任意组合
* Java关键字不能当作Java标识符

### 标识符命名约定
* **类和接口名**，首字母大写，如果是俩个单词，第二个单词的首字母大写
* **方法与变量**，首字符小写，其余的首字母大写，含大小写。尽量少用下划线。例如myName
* **常量**，全部字母大写，如果是俩个单词，使用下划线分隔，例如SIZE_NAME

## (06)Java 关键字与保留字

### 关键字
* Java语言中，关键字是特殊意义的固定单词
  * **数据类型**：boolean、int、long、short、byte、float、double、char、class、interface。
  * **流程控制**：if、else、do、while、for、switch、case、default、break、continue、return、try、catch、finally。
  * **修饰符**：public、protected、private、final、void、static、strict、abstract、transient、synchronized、volatile、native。
  * **动作**：package、import、throw、throws、extends、implements、this、supper、instanceof、new

### 保留字
* 保留字是为 Java 预留的关键字，它们虽然现在没有作为关键字。但可能在未来的版本中，将其作为关键字
  * true、false、null、goto、const。

## (07)Java 变量与常量

### 变量
* 变量可以分为三类：**局部变量**、**成员变量（实例变量）**、**静态变量（类变量）**
* 变量是程序中最基本的存储单元,由变量类型,变量名和存储的值组成。
* Java是一种**强类型**语言 ,每个变量都必须声明其数据类型。
* **强类型**：强制数据类型定义，更加严谨安全。所有的变量必须先声明、后使用。指定类型的变量只能接受类型与之匹配的值
#### 局部变量
* 局部变量位于方法或语句块内部，并且仅在声明的方法，语句块中可见
* 程序进入方法、语句块时会创建局部变量，直到执行完方法，语句块时，变量就会消失
* 局部变量没有任何关键字修饰
```
数据类型 标识符;
OR
数据类型 标识符 = 值;
```
#### 成员变量（实例变量）
* 成员变量是指在类体的变量部分中定义的变量，也称为属性，用于存储对象的状态
* 成员变量声明在类的内部，方法外部，对象创建时成员变量也跟着创建，对象消失成员变量也跟着消失
```java
public class HelloWorld {
    //成员变量
    public String name;
    public int age;
}
```
#### 静态变量（类变量）
* 静态变量在类中使用static关键字定义，在方法，语句块之外。
* static 修饰符告诉编译器，无论类被实例化多少次，类变量始终只有一个变量副本。只要类被加载到内存中，它就会存在。
* 随着程序启动时会创建静态变量，程序停止时会销毁静态变量。
```java
public class HelloWorld {
    //静态变量
    public static String name = "zhangsan";;
    public static int age = 18;
}
```

### 常量
* 常量是指在程序的整个运行过程中值保持不变的量，也可以分为三类：**局部常量**、**成员常量（实例变量）**、**静态常量（类变量）**
```java
// final 数据类型 标识符 = 值;
public class HelloWorld {
    //静态常量
    public static final String name = "zhangsan";;
    //成员常量
    final int age = 18;
    public static void main(String[] args) {
        // 局部常量
        final boolean i = true;
    }
}
```

## (08)Java 基本数据类型
* 整数类型、浮点类型、布尔类型、字符类型

### 整数类型
* **字节型byte**类型是最小的整数类型。当用户从网络或文件中处理数据流时，或者处理可能与 Java 的其他内置类型不直接兼容的未加工的二进制数据时，该类型非常有用。
* **短整型short**类型。
* **整型int**类型，常用的一种整数类型。
* **长整型long**：对于超出 int 类型所表示的范围时就要使用 long 类型


### 浮点类型
* 浮点类型是带有小数部分的数据类型，也叫**实型**.浮点型数据包括**单精度浮点型（float）**和**双精度浮点型（double）**。
* 双精度类型 double 比单精度类型 float 具有更高的精度和更大的表示范围。
* 注意：单精度类型float的值必须要以大写字母 F 或小写字母 f 结尾，否则会被当作 double 值。

### 布尔类型
* true 和 false

### 字符类型
* 字符类型（char）表示一个字符。可表示标准的 ASCII 码或 Unicode 字符

## (09)Java 运算符

### 运算符
* 算术运算符
  * 一元运算符
    * `-`: 取反符号
  * 二元运算符
* 赋值运算符
* 逻辑运算符
  > `&&`: 短路与(左边为false则不再执行右边) \
  > `||`: 短路或(左边为true则不再执行右边) \
  > `!`: 逻辑非 \
  > `&`: 逻辑与 \
  > `|`: 逻辑或 \
* 关系运算符
* 位运算符
  * 直接对整数类型的位进行操作，这些整数类型包括 long，int，short，char 和 byte。主要用来对操作数二进制的位进行运算。
  > `&`: 按位进行与运算 \
  > `|`: 按位进行或运算 \
  > `^`: 按位进行异或运算 \
  > `~`: 按位进行取反运算 \
  > `>>`: 有符号右移移运算符 \
  > `<<`: 左移位运算符 \
  > `>>>`: 无符号右移运算符 \
* 补充
  * 三元运算符
  * instanceof: 判断其左边对象是否为其右边类的实例，返回boolean类型的数据。可以用来判断继承中的子类的实例是否为父类的实现。
    ```
    boolean b = (任意对象表达式) instanceof (任意已定义的对象类)
    ```

### 

## (10)Java 运算符优先级
| 优先级 | 运算符 | 关联性 |
|------|-----------------|--------|
| 优先级 | 运算符 | 关联性 |
| 1 | ()、[]、{} | 左到右 |
| 2 | !、-、~、++、-- | 右到左 |
| 3 | *、/、% | 左到右 |
| 4 | +、- | 左到右 |
| 5 | <<、>>、>>>  | 左到右 |
| 6 | <、<=、>、>=、instanceof | 左到右 |
| 7 | ==、!=  | 左到右 |
| 8 | &  | 左到右 |
| 9 | ^  | 左到右 |
| 10 | &#124;  | 左到右 |
| 11 | &&  | 左到右 |
| 12 | &#124;&#124;  | 左到右 |
| 13 | ?: | 右到左 |
| 14 | =、+=、-=、*=、/=  | 右到左 |

## (12)Java 循环

### 循环中断
* `break`：break 用于完全结束一个循环
* `continue`：continue用于跳过循环中剩余的语句而强制执行下一次循环

## (13)Java 字符串与字符串常用方法
* Java字符串属于引用数据类型
* 字符串是由零个或多个字符组成的有限序列

### 字符串定义
* 双引号定义字符串
```
String a = "yes";
```

* 文本块：使用三引号定义一个多行字符串(Java 13 提供的预览特性)
```
String a = """
  Hello
  World
  """;
```

* String 类定义字符串
```
String a = new String("Hello World");
```
### 字符串常用方法
* **字符串拼接**：加法运算符可以将多个字符串进行拼接
* **获取字符串长度**：使用String 类的 `length()`方法可以获取字符串长度
* **截取字符串**：使用String 类的 `substring()`方法可以截取字符串
* **去除首尾空格**：使用String 类的 `trim()`方法可以去除首尾空格
* **字符串替换**：使用String 类的 `replace()`方法可以进行字符串替换
* **根据字符查找字符所在字符串索引**：使用String 类的 `indexOf()`方法和 `lastlndexOf()` 方法可以根据字符查找字符所在字符串索引，`indexOf()`方法为首次出现的索引位置，`lastlndexOf()`方法为最后出现的索引位置

## (14)Java 一维数组
* 数组属于引用数据类型

### 一维数组定义
* 数组中的数据类型可以是基本数据类型和引用数据类型。
* 数组的大小一旦声明就不能再修改
```java
数据类型[] 数组名;
int[] arrayName;
数组名 = new 数据类型[数组长度];
arrayName = new int[5];
OR
数据类型 数组名[];
int arrayName[];
数组名 = new 数据类型[数组长度];
arrayName = new int[5];
OR 简写
数据类型[] 数组名 = new 数据类型[数组长度];
int[] arrayName = new int[5];
```
### 一维数组初始化
* 定义的同时进行数组赋值
  ```java
  数据类型[] 数组名 = {元素1, 元素2, 元素3, 元素n};
  int[] arrayName = {1, 2, 3, 4, 5};
  OR
  数据类型[] 数组名 = new 数据类型[]{元素1, 元素2, 元素3, 元素n};
  int[] arrayName = new int[]{1, 2, 3, 4, 5};
  ```
* 定义后再进行数组赋值
  ```java
  int[] arrayName = new int[5];
  arrayName[0] = 1;
  arrayName[1] = 2;
  arrayName[2] = 3;
  arrayName[3] = 4;
  arrayName[4] = 5;
  ```

### 一维数组取值
* 使用foreach 循环遍历数组
```java
for (int i : arrayName) {
  System.out.println(i);
}
```

## (15)Java 二维数组

### 二维数组定义
* 每个数组元素是一个一维数组
* 数组长度2可为空，表示可变化
```java
数据类型[][] 数组名;
int[][] arrayName;
数组名 = new 数据类型[数组长度1][数组长度2];
arrayName = new int[5][];
OR
数据类型 数组名[][];
int arrayName[][];
数组名 = new 数据类型[数组长度1][数组长度2];
arrayName = new int[5][];
OR
数据类型[][] 数组名 = new 数据类型[数组长度1][数组长度2];
int[][] arrayName = new int[5][];
```

### 二维数组初始化
* 定义的同时进行数组赋值
  ```java
  数据类型[][] 数组名 = {{xx,xx}, {}, {}, {}};
  int[][] arrayName = {{1,2}, {3,4}, {5}};
  OR
  数据类型[][] 数组名 = new 数据类型[][]{{xx,xx}, {}, {}, {}};
  int[][] arrayName = new int[][]{{1,2}, {3,4}, {5}};
  ```
* 定义后再进行数组赋值
  ```java
  int[][] arrayName = new int[3][2];
  arrayName[0][0] = 1;
  arrayName[0][1] = 2;
  arrayName[1][0] = 3;
  arrayName[1][1] = 4;
  arrayName[2][0] = 5;
  ```

### 二维数组取值
* 使用foreach 循环遍历数组
```java
for (int[] ints : arrayName) {
  for (int anInt : ints) {
    System.out.println(anInt);
  }
}
```
* `Arrays.deepToString`
```java
System.out.println(Arrays.deepToString(arrayName))
```

## (16)Java 面向对象概念

### 对象特点
* 对象具有属性和行为
* 对象具有变化的状态
* 对象具有唯一性
* 对象都是某个类别的实例

### 面向对象核心特性
* 封装
  * 利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。
  * 数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。
  * 用户无需知道对象内部的细节，但可通过对象对外提供的接口来访问该对象。
  * 保证了程序和数据都不受外部干扰而且不被误用。
* 继承
  * 类之间的一种关系，子类可以拥有父类的全部特征和行为。
* 多态
  * 在父类中定义的属性和方法被子类继承后，可以具有不同的属性或表现方式。
  * 简单说就是子类可以自行实现功能扩展，而不需要修改基于父类的代码。

## (17)Java 类与对象

### 类定义
* 在面向对象中，类和对象是最基本、最重要的组成单元。
* 类是概念模型，定义对象的所有特性和所需的操作，对象是真实的模型，是一个具体的实体。
* 简单理解就是类是一个模板，可用来生产对象，而对象是一个具体的事物。
* Java 中类是引用数据类型

### 类的访问修饰符
| 访问修饰符 | 可修饰 | 可访问 |
|------|------|------|
| public | 类、属性、方法 | 任何 |
| private | 内部类、属性、方法 | 同一类 |
| protected | 内部类、属性、方法 | 同一包和子类 |
| default | 默认修饰符 | 同一包 |

### 类创建对象
* 使用 new 关键字可以实例化对象。首先在内存的栈空间中声明对象。之后在内存的堆空间实例化对象。
```java
类名 对象名称 = new 类名();
```
* 使用getDeclaredConstructor方法获得构造器对象并调用newInstance()方法创建对象
```java
类名 对象名称 = 类名.class.getDeclaredConstructor().newInstance();
```
* 使用Class.forName方法获得类的class并调用newInstance()方法创建对象
```java
类名 对象名称 = (类名) Class.forName("类名").newInstance();
```

## (18)Java 方法

### 方法定义
* 完整的方法通常包括**方法名称**、**方法主体**、**方法参数**和**方法返回值**类型
```java
访问修饰符 返回类型 方法名(参数列表) {
    //语句块
    //如有返回值做return操作
}
```
* 访问修饰符可取：
  * public、private、protected、或省略。
  * 同样方法也可被final、abstract、static等修饰。
* 返回类型：
  * 任何数据类型或 void(无返回值)。

### 方法传值接值
* 方法接收**基本类型参数**时，方法外部和方法内部的变量**互不影响**。
* 方法接收**引用数据类型参数**时，方法外部和方法内部的变量**可相互影响**(虽然String是引用数据类型，但是String一旦赋值无法修改)。

### 可变参数
* 方法参数个数不确定时，可使用可变参数方式。
* 可变参数用 **类型…**​ 表示，可变参数可简单理解为数组类型

## (19)Java 构造方法

### 构造方法
* 构造方法是一个特殊方法，用来初始化类的一个新对象。
* 每个类都有一个默认的构造方法，创建对象之后会自动调用。
* 可以有多个构造方法。
* 方法名必须与类名相同。
* 构造方法不能被static、final、abstract等修饰符修饰。
* 不需要写返回值字段。
* 类中定义了一个或多个构造方法的话 Java 不会再提供默认构造方法。

### this 关键字
* 这里的this关键字用于实例方法指向当前对象。
* 解决实例变量与构造方法参数同名称时，不能赋值的问题。
* 同时this 关键字也还能调用同一类中其他的成员方法。
```java
void change() {
    System.out.println("change");
}
void eat(){
    this.change();
}
```
* 注意：静态成员不能直接访问非静态成员，也就是说static修饰的方法不能使用this。

## (20)Java 方法重载

### 方法重载
* 同一个类中多个同名方法，同名方法的形参列表不同。可避免类似方法，出现太多方法名的情况，同时调用简单。

## (21)Java 类封装

### 封装的优点
* 隐藏实现细节：对象的内部实现被隐藏，只向外部提供一个访问接口，可以减少代码的耦合度，并提高代码的可维护性和可扩展性。
* 简化编程：封装使得对象的使用者可以更加简单和方便地使用对象，不需要了解对象的复杂实现，也不需要知道对象内部的状态和数据结构。
* 提高安全性：封装可以保护对象的属性和方法不被外部直接访问和修改，确保对象的数据安全性和正确性。
* 提高代码的可重用性：封装使得对象可以被多次使用，并且在不同的环境中被重复使用，提高了代码的可重用性。

### 封装的步骤
* 属性的可见性设置为 private。
* 每个属性创建对应的setter方法和getter方法，可见性设置为 public。
* 在setter方法和getter方法中，需对属性值的合法性进行判断。

## (22)Java 继承

### 继承
* 需注意过度的继承也会导致代码的耦合性增加，因此需谨慎使用继承，避免出现继承层次过深和复杂的情况。
* 父类有有参的构造方法但没有无参构造方法的情况，那么在子类中必须有有参构造方法，因为子类如不提供构造方法的话会调用父类中无参的构造方法。
* Java的继承是单一继承，一个子类只能拥有一个父类，一个父类可以拥有多个子类。
```java
访问修饰符 class 类名 extends 父类 {
}
```

## (23)Java super关键字

### super
* super用在子类中，可以访问父类变量或方法。
* super和this一样不能在static 变量、static 方法和 static 代码块中使用。
* 调用super()必须写在子类构造方法的第一行。
* 子类的构造方法会隐含地调用super()(不用显式的写也行)，如父类没有这种形式的构造函数，则报错。

### super用法
* `super.父类属性`：调用父类中的属性
* `super.父类方法`：调用父类中的方法
* `super()`：调用父类的无参构造方法
* `super(参数)`：调用父类的有参构造方法

## (24)Java 方法重写

### 方法重写
* Java中的方法重写(Override)指的是在子类中重新定义一个与父类中同名、同返回类型、同参数列表的方法。
* 并且方法的访问修饰符不能低于父类中的方法。
* 构造方法不能被重写。
* 重写方法一定不能抛出新的检査异常或者比被重写方法更加宽泛的检査型异常。
* 只有父类被子类继承时，方法才能被重写。
* 定义为 static 的方法不能被重写，但是能够再次声明。
* 定义为 final 的方法不能被重写。
* 子类和父类在同一个包中时，子类可以重写父类的所有方法，除了定义为 private 和 final 的方法。
* 子类和父类不在同一个包中时，子类只能重写父类的定义为 public 和 protected 的非 final 方法。

### 方法重写的优点
* 提高代码的可维护性：方法重写可以让子类根据自身的特点重新定义某些继承自父类的方法，使得代码更加灵活，容易维护。
* 实现多态性：方法重写是实现多态性的重要机制，可以在运行时动态地调用子类对象的方法，从而根据不同对象的类型执行不同的操作。

### 与方法重载的区别
* 参数列表不同：方法重载的方法名相同，但是参数列表不同（参数类型、参数个数、参数顺序等），方法重写的方法名和参数列表都必须相同。
* 返回值不同：方法重载可以改变返回值类型，但是方法重写的返回值类型必须和被重写的方法返回值类型相同或是其子类。
* 静态/实例方法：方法重载可以是静态方法或实例方法，方法重写只能是实例方法。
* 修饰符：方法重载可以改变方法的修饰符，但是方法重写的访问修饰符不能低于父类中的方法。
* 抛出异常不同：方法重载的方法可以抛出任何非受查异常，而方法重写的方法只能抛出和被重写方法抛出异常相同或是其子类。

## (25)Java final关键字

### final关键字用法
* final关键字用来表示不可变的、不可修改的意思。
* **变量**：用final修饰的变量表示一个常量，即只能赋值一次且在声明时或构造函数中进行赋值，之后不可修改。
* **方法**：用final修饰的方法表示该方法不可被重写。如果一个类中的某个方法不希望在子类中被修改，可以使用final关键字修饰该方法。
* **类**：用final修饰的类表示该类不能被继承。如果一个类不希望被其他类继承，可以使用final关键字修饰该类。

### final关键字的好处
* 提高程序的性能：Java 编译器可以使用一些优化技术，例如内联方法，以便更好地处理 final 变量。
* 更安全的多线程编程：final 变量在多线程环境中是线程安全的，因为其值不会被更改，避免了线程竞争和同步的问题。
* 更加可读的代码：final 关键字可以让代码更加易于理解和维护，因为它明确了某些值或行为的不可更改性。

## (26)Java 多态

### 多态
* Java中多态是一种对象的行为，指的是同一个方法名，但具体的实现方式却有多种可能。
* 这种能力称为"多态性"，Java中的多态性分为编译时多态性和运行时多态性两种。
**编译时多态性**
* 编译时多态性也称为静态多态性，指的是方法的重载特性，即在编译时确定调用的方法。
**运行时多态性**
* 运行时多态性也称为动态多态性，指的是方法的重写特性，即在运行时根据对象的实际类型确定调用的方法。
* 运行时多态性需要满足三个条件：继承、方法重写和父类引用指向子类对象(向上转型)。

### 多态的优点
* 可扩展性：多态使得程序的扩展变得更加容易。通过继承和方法重写，可以轻松地添加新的功能，而无需对现有代码进行修改。
* 代码重用：多态性使得代码的重用更加容易。可以创建一个通用的父类，然后通过继承该父类创建许多不同的子类。这些子类可以共享通用的属性和方法，从而实现代码重用。
* 灵活性：多态性使得程序更加灵活。通过多态，可以在运行时决定对象的类型，并动态地调用相应的方法。这使得程序的行为可以根据运行时环境的变化而变化，从而使程序更加适应不同的场景。

## (27)Java 抽象类

### 抽象类
* Java中的抽象类是一种特殊的类，它不能被实例化，只能被继承。
* 抽象类定义了一组抽象方法，这些方法没有实现，只有方法声明。
* 子类必须实现这些抽象方法才能被实例化。

### 抽象类的优点
* 抽象类可以为具有相似特征的一组类提供一个通用的抽象概念，避免了代码的重复，提高了代码的复用性和可维护性。
* 抽象类可以限制某些方法的访问权限，从而控制子类对其行为的修改，提高了程序的安全性。
* 抽象类可以通过定义抽象方法来规范子类的行为，增强了程序的可扩展性。子类必须实现抽象方法，以保证其符合规范。

### 抽象方法
* 抽象方法是指只有方法声明而没有方法实现的方法。
* 使用 abstract 关键字进行修饰。
* 抽象方法必须在抽象类中声明。

### 抽象注意事项
* 抽象方法不能被声明为私有、静态、final或native。
* 抽象类可以包含抽象方法和具体实现的方法。
* 抽象类不能实例化。
* 子类继承抽象类时必须实现父类的所有抽象方法，否则子类也必须被声明为抽象类。

## (28)Java 接口

### 接口
* Java中的接口（Interface）是一种特殊的抽象类。
* 它是一组抽象方法的集合，不包含属性，所有方法必须是公共的抽象方法。
* 实现接口的类必须实现接口中所有的方法。接口可以看作是一种约定，用于规范某一类对象必须具备的行为。

### 接口定义
* 接口可以有多个父接口。
* 接口只能继承接口，不能继承类。
  ```java
  访问修饰符 interface 接口名 [extends 接口名(可多个)] {
  }
  ```

### 接口实现
* 一个类可以实现一个或多个接口。
* 如有extends 那么implements须放在extends后。
  ```java
  访问修饰符 class 类名 [extends 类(只一个)] [implements 接口名(可多个)] {
  }
  ```

### 接口的优点
* 规范行为：接口可以规范某一类对象必须具备的行为。
* 多重继承：Java中的类只能单继承，但一个类可以实现多个接口，这样就可以实现多重继承，提高了代码的复用性和灵活性。
* 松耦合：接口使得类与类之间的依赖关系更加松耦合，便于代码的维护和升级。
* 扩展性：接口定义了一组规范，可以方便地进行扩展和升级。如果需要添加新的行为，只需新增一个实现了接口的类即可，不需要修改已有的代码。

### 接口补充
* 从 JDK 1.8 开始，Java 接口可以定义**默认方法**和**静态方法**。
* **默认方法**是在接口中已经有了一个默认的实现方法，实现类可以直接继承或者重写这个方法，而不需要再次实现。
* **静态方法**是指在接口中定义的静态方法，可以通过接口名直接调用，而不需要实现类的实例。

## (29)Java 抽象类与接口区别

### 抽象类与接口区别
* **实现**：一个类只能继承一个类，但是可以实现多个接口。接口的实现使用关键字 implements，而抽象类的实现使用关键字 extends。
* **构造函数**：抽象类可以有构造函数，而接口不能有构造函数。
* **成员变量**：接口中定义的变量默认为 public static final，也就是常量，而抽象类中定义的变量则可以是各种类型的变量。
* **成员方法**：接口中的方法默认为 public abstract，而抽象类中的方法可以有不同的访问修饰符，并且可以有非抽象方法。
* **多重继承**：由于一个类只能继承一个类，而可以实现多个接口，因此接口可以用来实现多重继承。
* 接口更适用于定义类之间的行为规范，而抽象类更适用于将公共功能放在一起，以便子类继承和重用。

## (30)Java static关键字

### static关键字
Java中static关键字用于指示一个成员变量或方法属于类本身，而不是属于类的实例。
使用static关键字定义的变量或方法可以通过类名直接访问，而不需要创建类的实例。

### static优点
* 节省内存：static变量只会在内存中存在一份拷贝，而不是每个实例都有一份拷贝，这可以节省内存空间。
* 方便访问：由于static方法和变量可以直接使用类名调用，所以可以更方便地访问这些成员，而不需要创建类的实例。
* 可以共享数据：static变量可以在所有实例之间共享，这样可以在多个实例之间共享数据，提高了程序的效率。
* 方便实现工具类和单例模式：使用static方法和变量可以方便地实现工具类和单例模式，因为这些类通常不需要创建实例，而是直接使用类名调用方法或变量。

### static关键字使用
* 静态变量
  * 静态变量只分配一次内存，在加载类的过程中完成静态变量的内存分配。
  * 静态变量被类的所有实例共享。
    ```java
    public static int count = 0;
    ```
* 静态方法
  * 静态方法可通过类名直接调用。
    ```java
    public static int getCount() {
        return count;
    }
    ```
* 静态代码块
  * 静态代码块用于初始化类，为类的静态变量赋初始值。
  * 静态代码块可多个并放在类中的任何地方，在加载类时执行静态代码块。
  * 静态代码块只会被执行一次。
    ```java
    static {
        System.out.println("类加载了");
    }
    ```

## (31)Java 内部类

### 内部类
* Java中的内部类是定义在一个类中的类。
* 内部类可分为四种：成员内部类、静态内部类、方法内部类和匿名内部类。

### 成员内部类
* 成员内部类是一种定义在类中的内部类，它与外部类的成员变量和方法处于同一层次。
* 成员内部类可以访问外部类的成员变量和方法，即使这些成员变量和方法是私有的。
```java
class OuterClass {
  // 外部类
  class InnerClass {
    // 内部类
  }
}
```
* 成员内部类优点：
  * 可以访问外部类的私有成员变量和方法，从而可以提供更加严密的封装性。
  * 可以用来实现一些只在外部类中使用的接口，从而提高代码的模块化程度。

### 静态内部类
* 静态内部类是定义在一个类内部，并使用 static 修饰的类。
* 相对于成员内部类，它与外部类的实例无关，也就是说可以不依赖于外部类的实例而直接创建对象。
* 在静态内部类中可以定义静态成员变量、静态方法、实例变量、实例方法等，与普通的类类似。
```java
class OuterClass {
    static class StaticInnerClass {
        // 静态内部类
    }
}
```
* 静态内部类优点：
  * 可以访问外部类的静态变量和方法，方便地共享数据和方法。
  * 可以直接创建静态内部类的对象，而不需要先创建外部类的对象。

### 方法内部类
* 方法内部类是指定义在一个方法内部的类。
* 只能在该方法内部被访问，无法从方法外部访问。
* 还需注意不能使用访问修饰符。
```java
class OuterClass {
    public void method() {
        class MethodInnerClass {
            // 方法内部类
        }
    }
}
```
* 方法内部类通常用于需要临时创建一个类的情况，且这个类只需要在该方法中使用。
* 相比于定义一个独立的类，使用方法内部类可以减少类的数量，避免命名冲突，提高代码的可读性和可维护性。

### 匿名内部类
* 匿名内部类是一种没有命名的内部类。
* 它可以用于创建只需要使用一次的简单类。
* 通常情况下，它用于实现接口或继承类。
* 匿名内部类可使代码更加简洁、灵活和实用。

## (32)Java 异常

### 异常
* Java 异常是指在程序执行过程中发生的一些不期望的、异常的事件，例如除数为 0、空指针引用等。
* 当这些异常事件发生时，程序会停止执行并抛出异常，如果异常没有得到处理，程序可能会终止运行。
* Java 中提供了异常处理机制，可以让程序在发生异常时执行相应的处理逻辑，避免程序崩溃。
* Exception通常表示可预见的问题，例如输入错误、网络中断、文件不存在等等，这些异常可以通过代码进行处理。

### 异常类型
* Java中所有异常类型都是内置类java.lang.Throwable类的子类，即Throwable类是所有异常和错误的父类。
* Throwable类下有两个异常分支 Exception 和 Error。
* Exception包括 Unchecked Exception（非检查异常）和 Checked Exception（检查异常）两大类别。
  * 非检查异常是编译器不要求强制处理的异常，也就是说编写代码时不去处理此类异常，程序还是会编译通过。非检查异常不需要在代码中显式处理，例如NullPointerException(空指针异常)、IllegalArgumentException(非法实参调用方法)等。
  * 检查异常是编译器要求必须处理的异常，也就是说编写代码时必须处理此类异常，否则程序无法编译通过。检查异常必须在代码中显式处理，否则编译器会报错，例如IOException(IO操作异常)、SQLException(SQL异常)等。
* Error是指不希望被应用程序捕获的严重问题，这些错误在应用程序的控制和处理能力之外。

## (33)Java 异常处理

### 异常处理机制
* **捕获异常**：用try catch 语句捕获并处理异常。
* **抛出异常**：抛出异常是Java中一个程序处理的动作，如当前方法没有捕获异常，异常会抛到上层调用方法，直到被捕获为止。

### 捕获异常
* Java中通常采用try catch 语句来捕获异常并处理。
``` java
try {
    // 可能发生异常的语句
} catch (异常类型 e) {
    // 捕获并处理try抛出的异常
} finally {
    // 无论是否发生异常都会执行的语句
}
```
* catch语句可以有多个，代表代码块中可能有很多语句会发生异常。
* 注意：当捕获的多个异常类之间存在父子关系时，捕获异常时一般先捕获子类，再捕获父类。所以子类异常必须在父类异常的前面。
* 因为catch是按照从上往下的顺序进行匹配，一旦匹配就不会再向下继续匹配。
``` java
try {
    int i = 1 / 0;
}catch (Exception e){
    e.printStackTrace();//输出异常信息
}finally {
    System.out.println("Done");
}
```

### 抛出异常
* Java中throw 语句用来直接拋出一个异常，后接一个可拋出的异常类对象。
``` java
// throw 异常类对象;
int b = 0;
if (b == 0) throw new ArithmeticException();
int i = 1 / b;
```
* 这里先判断除数的值，如为零则使用throw语句抛出算数异常类对象。
* 可使用throw语句抛出任何类型的Throwable类或其子类的对象，会中断执行，也就是说throw语句之后的内容不会执行。

### 声明异常
* Java中throws语句可声明方法要抛出何种类型的异常。
* 用于方法可能出现异常，但不处理此异常时，可通过throws语句声明异常。
``` java
// throws 异常类对象1,异常类对象2;
public static void main(String[] args) throws ArithmeticException{
}
```

### throws和throw的区别：
* throws用于在方法声明中指定可能会抛出的异常类型，表示一种可能性，但并不一定会发生这些异常。
* throw则是用于在代码中显式抛出异常，表示一定抛出某种异常。

## (34)Java 自定义异常

### 自定义异常优点
* 该类继承自Java的标准异常类（Exception、RuntimeException等）之一。
* 提高代码的可读性和可维护性：通过自定义异常类，我们可以将程序中可能发生的不同异常情况进行分类，并为每种情况定义一个特定的异常类。这样，我们就可以更清晰地了解程序中可能发生的错误，并更好地维护代码。
* 提供更精确的异常信息：Java的标准异常类提供了一些常用的异常类型，如NullPointerException等。但是，在某些情况下，这些异常类型可能无法满足我们的需求。通过自定义异常类，我们可以提供更加精确和具体的异常信息，这样我们就可以更好地定位和解决程序中的错误。
* 程序结构更清晰：通过自定义异常类，我们可以将异常处理与业务逻辑分离。这样，我们就可以更好地管理代码，并使程序结构更加清晰。
* 提高代码的健壮性：通过自定义异常类，我们可以更好地处理程序中的异常情况，从而提高程序的健壮性和容错性。这有助于保证程序在面对异常情况时仍能够正常运行，并避免程序的崩溃。

## (35)Java Lambda表达式

### Lambda表达式
* Java Lambda表达式是Java 8中引入的一种新特性，它是一种简洁而强大的函数式编程的方式。
* 它允许您将函数作为参数传递给方法，或者使用函数式接口来创建函数对象。
* Lambda表达式可以被看作是一种匿名函数，可以在不创建类的情况下定义函数，因此它是一种更为简洁、灵活的编程方式。

### 函数式接口
* 函数式接口指在一个接口里面有且仅有一个抽象方法，但是可以有多个非抽象方法的接口。
* 在编写程序过程中可将@FunctionalInterface注解放在接口上方，如果接口是函数式接口则编译通过，不符合规范则编译报错。
* @FunctionalInterface注解会让编译器去检查编写的接口是否仅包含一个抽象方法。（所以不一定要写上）

### 使用Lambda表达式优点
* 简洁性：Lambda表达式比传统的Java代码更为简洁，可以减少大量样板式代码，使代码更易于阅读和理解。
* 灵活性：Lambda表达式可以在需要函数式接口的任何地方使用，从而提高了代码的灵活性。
* 并行处理：Lambda表达式可以简化并行处理代码的编写，可充分利用多核CPU的优势。
* Lambda表达式是Java 8中最强大和最具创新性的功能之一。

### 语法
* Lambda表达式的语法基本上由参数列表、箭头符号和方法体组成。
* 这个表达式中参数列表包含传递给方法的参数，箭头符号指示Lambda表达式的开始，而方法体则包含在大括号中的代码块。
```java
(parameter1, parameter2, ...) -> { expression }
```

## (36)Java Lambda表达式简写

### 省略参数类型
* 如果Lambda表达式的参数类型可以被编译器推断出来，那么可以省略参数类型。
```java
MyInterface myLambda = (a, b) -> a + b;
```

### 省略参数类型
* 局部变量类型推断
* Java 11开始支持在Lambda表达式中使用var关键字来定义变量。
* 使用var关键字可以让代码更加简洁，并且可以更容易地表达出变量的意图。
```java
MyInterface myLambda = (var a, var b) -> a + b;
```

### 省略参数括号
* 如果Lambda表达式只有一个参数，可以省略参数括号。
```java
MyInterface myLambda = a -> a * a;
```

### 省略方法体大括号
* 如果Lambda表达式方法体只有一行代码，可以省略方法体大括号。
```java
MyInterface myLambda = a -> a * a;
```

### 方法引用
* 如果Lambda表达式只是调用一个已经存在的方法，可以使用方法引用。
* 方法引用是一种特殊的Lambda表达式。方法引用使得代码更加简洁，易于阅读和维护。
* 方法引用可以看作是Lambda表达式的一个语法糖，它通过一些特定的符号和语法来指定要调用的方法。
```java
MyInterface myInterface = System.out::println;
```

### 方法引用形式
* 静态方法引用
  * 语法：ClassName::staticMethodName
  * 示例：System.out::println
  * 上面的代码使用了System.out对象的println方法，这个方法是一个静态方法，因此可以使用静态方法引用的语法糖。
* 实例方法引用
  * 语法：object::instanceMethodName
  * 示例：String::length
  * 上面的代码使用了String类的length方法，这个方法是一个实例方法，因此可以使用实例方法引用的语法糖。
* 对象方法引用
  * 语法：ClassName::instanceMethodName
  * 示例：ArrayList::size
  * 上面的代码使用了ArrayList类的size方法，这个方法是一个实例方法，但是它没有特定的实例对象，因此可以使用对象方法引用的语法糖。
* 构造方法引用
  * 语法：ClassName::new
  * 示例：String::new
  * 上面的代码使用了String类的构造方法，这个方法是一个构造方法，因此可以使用构造方法引用的语法糖。

## (37)Java 函数式接口

### 使用函数式接口的优点
* 简化代码：使用函数式接口和 Lambda 表达式可以使代码更加简洁，减少样板代码，降低代码复杂度。
* 提高可读性：使用函数式接口可以更加直观地表达代码的意图，使得代码更加易读易懂。
* 支持并行执行：函数式接口和 Lambda 表达式支持并行执行，可以将任务分配给多个线程同时执行，提高程序的并发能力和效率。
* 支持更灵活的设计模式：使用函数式接口可以更加灵活地设计代码结构，例如可以使用 Lambda 表达式作为参数传递，可以在运行时动态生成函数式接口的实现类等。
* 在函数式编程中，函数是头等对象即头等函数，这意味着一个函数，既可以作为其它函数的输入参数值，也可以从函数中返回值，被修改或者被分配给一个变量。

### Runnable
* Runnable 是一个没有参数和返回值的函数式接口，用于表示一个可执行的任务。
* 该接口只有一个抽象方法 run()，用于定义具体的任务代码或处理逻辑。
* 在多线程编程中，可以通过实现 Runnable 接口来创建一个新的线程。
```java
Runnable task = () -> System.out.println("Running the task");
new Thread(task).start();
```

### Consumer
* Consumer 是一个接收单个输入参数并且没有返回值的函数式接口。它表示了对输入参数的消费操作。
* 该接口只有一个抽象方法 accept(T t)，用于消费一个参数数据
* 该接口还有一个默认方法 andThen(Consumer<? super T> after)，可返回一个组合的 Consumer，依次执行操作。
```java
Consumer<String> consumer = System.out::println;
consumer.accept("Hello, World!");
```

### Supplier
* Supplier 是一个没有参数但是返回一个值的函数式接口。它表示了对值的生成操作。
* 该接口只有一个抽象方法 get()，用于按照由Lambda表达式定义的相关实现，返回一个具体的数据
```java
Supplier<Integer> randomInt = () -> new Random().nextInt(10);
int result = randomInt.get();
System.out.println(result); // 0 到 9 之间的随机整数
```

### Function
* Function 是一个接收一个参数并产生一个结果的函数式接口。它表示了从一个值到另一个值的映射操作。
* 该接口只有一个抽象方法 R apply(T t)，用于接收一个数据操作数据之后返回一个新的数据。
```java
Function<Integer, String> intToString = (i) -> "The number is " + i;
String result = intToString.apply(66);
System.out.println(result); // 输出 "The number is 66"
```

### Predicate
* Predicate 是一个接收单个输入参数并返回一个布尔值的函数式接口。它表示了对输入参数的判断操作。
* 该接口只有一个抽象方法 boolean test(T t)，用于对接受数据做出相应的判断。
```java
Predicate<Integer> isPositive = i -> i > 0;
boolean result1 = isPositive.test(42);
System.out.println(result1); // 输出 true
boolean result2 = isPositive.test(-1);
System.out.println(result2); // 输出 false
```

## (38)Java Lambda延迟执行

### Lambda延迟执行
* Java中Lambda表达式是不会立即执行的，而是在需要执行的时候才会被调用执行。
* 这种延迟执行的机制可以带来节省计算资源的优点：Lambda表达式只有在需要执行的时候才会被调用执行，因此可以减少不必要的计算资源消耗，提升性能。
* 但同时需要注意的是，Lambda表达式的延迟执行也可能带来一些负面影响，例如一些错误可能在运行时才被发现，因此需要在使用Lambda表达式时慎重考虑其优缺点。

## (39)Java 多线程

### 进程
* 进程是一个具有一定独立功能的程序在某个数据集合的一次运行活动，是系统进行资源分配和调度的一个独立单位。
* 从操作系统角度来看，可将进程分为系统进程和用户进程两类。
* 系统进程执行操作系统程序，完成操作系统的某些功能。
* 用户进程运行用户程序，直接为用户服务。
* 系统进程的优先级通常高于一般用户进程的优先级。
* 进程=(程序+数据+进程控制块PCB)。

### 程序与进程区别
* 进程是动态的：是程序的一次执行过程。
* 程序是静态的：是一组指令的有序集合。
* 进程是暂存的：在内存驻留。
* 程序是长存的：在存储介质中存储。

### 线程
* 80年代中期，随着操作系统理论和技术发展，提出了比进程更小的、能够独立运行的基本单位线程。
* 线程可以提高系统内程序并发执行的级别，可以进一步提高系统效率。
* 进程是资源拥有者，进程的创建撤销切换等过程中系统会付出较大的时空开销。
* 线程是进程中的一个实体，是处理器调度和分派的基本单位。
* 同时基本上不拥有系统资源，只拥有少量在运行中必不可少的资源，与同属进程共享进程全部资源。
* 同一个进程中的多个线程之间可以并发执行。
* 线程又称为轻量级进程(LWP)，传统的进程又称为重量级进程(HWP)。

### 线程的优点
* 创建新线程花费时间少，无需额外分配资源。
* 线程之间切换快。
* 线程间的通信，更便捷，更快。
* 线程可独立运行，能够充分利用和发挥CPU与外部设备的并行工作能力。

## (40)Java 线程创建

### 继承Thread类
* 可以定义一个继承Thread类的子类，在子类中重写run()方法，run()方法中的代码将在新的线程中执行。
* Thread类是Java多线程编程的核心类，提供了多种常用的方法:
* start()：启动线程，并执行线程中的run()方法。
* run()：定义线程的执行逻辑，必须被重写。
* sleep(long millis)：使当前线程暂停指定的时间（毫秒）。
* join()：等待线程执行完毕。
* join(long millis)：等待线程执行指定的时间（毫秒）。
* isAlive()：判断线程是否还存活。
* interrupt()：中断线程的执行。
* setPriority(int priority)：设置线程的优先级。
* getPriority()：获取线程的优先级。
* getName()：获取线程的名称。
* setName(String name)：设置线程的名称。
* yield()：让出CPU资源，使其他线程有机会执行。

### 实现Runnable接口
* 实现Runnable接口相较于继承Thread类：
* 实现 Runnable 接口相对于继承 Thread 类更加灵活。
* 因为 Java 是单继承的，如果继承了 Thread 类，就不能再继承其他的类。
* 但实现 Runnable 接口并不会对类的继承关系造成影响。
* 也更加符合面向对象的设计原则。
* 大多数情况下，使用多线程仅仅是为了实现某个功能，而不是继承 Thread 类的某些特性。

### 实现Callable接口
* Callable接口与Runnable接口类似，可用于多线程编程。
* 不同的是，Callable接口的call()方法可以返回一个值，并且可以抛出异常。
* 而 Runnable接口的run()方法是void 类型的，无法返回值或者抛出异常。

## (41)Java 线程状态
### 线程状态可分为
* NEW：线程刚被创建，但还没有被启动。
* RUNNABLE：线程正在执行或者等待执行，也就是有可能处于运行状态，或还在等待 CPU 时间片。
* BLOCKED：线程被阻塞不能执行，有可能正在等待获得一个监视器锁，。
* WAITING：线程正在等待另一个线程执行特定操作，例如调用 wait() 或者 join()等。
* TIMED_WAITING：线程正在等待另一个线程执行特定操作，但是等待时间有限，例如调用 sleep()等。
* TERMINATED：线程已经执行完毕。
* 一个线程在一个时间点只能处于一种状态。

### Java多线程状态的作用
* 实现线程同步：多线程状态中的 BLOCKED 和 WAITING 状态可以用来实现线程同步，从而避免多个线程访问共享资源时的并发问题。
* 监控线程状态：多线程状态可以用来监控线程的状态，从而了解线程的执行情况，及时进行调优和问题排查等等。

## (42)Java 线程中断


## (43)Java 守护线程


## (44)Java 线程同步


## (45)Java 线程wait与notify


## (46)Java 线程池


## (47)Java ForkJoin


## (48)Java 泛型


## (49)Java 反射


## (50)Java IO概念


## (51)Java 文件IO


## (52)Java 缓冲流


## (53)Java 对象流


## (54)Java Socket

