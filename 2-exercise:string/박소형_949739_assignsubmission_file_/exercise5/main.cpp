#include <iostream>
#include <string>
#include <sstream> // istringstream, ostringstream 클래스를 사용하기 위한 헤더

using namespace std;

int main() {
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout을 통해 화면에 직접 출력

	ostringstream ost; // ostringstream 클래스 ost 객체를 선언
	ost << "ost: " << num1 << "," << num2 << endl;    // ost에 "ost: "와 num1과 ","와 num2를 출력  cf. sprintf
    cout << ost.str()  << endl;     // ost에 출력한 문자열을 cout에 출력


	// istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";
	string line;
	do {                    // 왜 반복문이 필요할까요? 
		// 위에서 입력을 받고 엔터를 쳐서 , 해당 부분에서 잘 입력이 안 되는 경우가 생길 수 있다. 
		getline(cin, line);
	} while (line == "");

	istringstream ist(line);     // istringstream 클래스 객체 ist를 선언하고 line을 초기화

	string first, last;
	ist >> first >> last;
	cout << "ist: " << first << "," << last << endl;

	return 0;
}