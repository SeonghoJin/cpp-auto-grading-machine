#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // 피연산자1, 피연산자2
	string op;            // 연산자 (이름)
	int result;           // 연산 결과 

	cout << "정수 두개와 그 사이에 원하는 연산자를 입력하시오(10 + 20 또는 10 - 20): " << endl;
	cin >> oprnd1 >> op >> oprnd2;

	if (op == "+") result = oprnd1 + oprnd2;
	else if (op == "-") result = oprnd1 - oprnd2;
	else result = 0;

	cout << result << endl;

	return 0;
}
