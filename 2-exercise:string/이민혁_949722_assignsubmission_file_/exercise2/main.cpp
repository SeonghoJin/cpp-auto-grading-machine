#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // 피연산자1, 피연산자2
	string op;            // 연산자 (이름)
	int result;           // 연산 결과 

	cin >> oprnd1 >> op >> oprnd2;

	if (op == "+") result = oprnd1 + oprnd2;
	else if (op == "-") result = oprnd1 - oprnd2;
	else result = 0;

	cout << result;

	return 0;
}
