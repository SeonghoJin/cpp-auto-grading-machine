#include <iostream>
#include <string>
#include <sstream> /* 완성하시오 */     // istringstream, ostringstream 클래스를 사용하기 위한 헤더

using namespace std;

int main() {
        // ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout을 통해 화면에 직접 출력

	ostringstream ost;     // ostringstream 클래스 ost 객체를 선언

	ost << "ost: " << num1 << "," << num2 << endl;    // ost에 "ost: "와 num1과 ","와 num2를 출력  cf. sprintf

	cout << ost.str() << endl;     // ost에 출력한 문자열을 cout에 출력


        // istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";

        string line;
	do {                    // 왜 반복문이 필요할까요?  버퍼에 개행문자가 남아있어 line에 제대로된 값이 읽히지 않는것을 방지해주는 것 같다.
							//찾아보니 getline전에 cin.ignore를 사용할 수도 있는 것 같다.
	  getline(cin, line);
	} while (line == "");

	istringstream ist(line);     // istringstream 클래스 객체 ist를 선언하고 line을 초기화

	string w1, w2;
	ist >> w1 >> w2;       //  ist로부터 두 단어 w1과 w2를 입력 받음  cf. sscanf

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
