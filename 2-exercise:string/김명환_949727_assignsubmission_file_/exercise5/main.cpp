#include <iostream>
#include <string>
#include <sstream>   // istringstream, ostringstream 클래스를 사용하기 위한 헤더

using namespace std;

int main() {
        // ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout을 통해 화면에 직접 출력

	ostringstream ost;      // ostringstream 클래스 ost 객체를 선언

	ost << "ost: " << num1 << "," << num2 ;     // ost에 "ost: "와 num1과 ","와 num2를 출력  cf. sprintf

	cout << ost.str() << endl;     // ost에 출력한 문자열을 cout에 출력


        // istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";

        string line;
	do {                    // 왜 반복문이 필요할까요?  앞에서 이미 문자열을 받은적이 있어서 getline을 그대로 사용하면 공백이 포함됨으로 공백을 입력받지 않게 하기위함.
	  getline(cin, line);
	} while (line == "");

	istringstream ist(line);      // istringstream 클래스 객체 ist를 선언하고 line을 초기화

	string w1, w2;
	ist >> w1 >> w2;      //  ist로부터 두 단어 w1과 w2를 입력 받음  cf. sscanf

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
