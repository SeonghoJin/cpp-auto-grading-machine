#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // 피연산자1, 피연산자2
	string op;            // 연산자 (이름)
	int result;           // 연산 결과 

	cin >> oprnd1;
	cin >> op;
	cin >> oprnd2;

	int res = 0
	if (op == "+") {
		res = oprnd1 + oprnd2;
	}
	else if(op == "-") {
		res = oprnd1 - oprnd2;
	}
	cout << res;

	return 0;
}
