package Java._01_HelloWorld;

public class If01 {
    public static void main(String[] args) {
        int age = 19;
        String sex = "Male";
        if (age > 18) {
            if (sex.equals("Female")) {
                System.out.println("OK");
            } else {
                System.out.println("NO"); // NO
            }
        } else if (age == 18) {
            System.out.println("OK1");
        } else {
            System.out.println("NO");
        }
    }
}
