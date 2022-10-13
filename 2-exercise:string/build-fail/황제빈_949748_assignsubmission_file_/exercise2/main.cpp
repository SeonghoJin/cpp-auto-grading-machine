#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // 피연산자1, 피연산자2
	string op;            // 연산자 (이름)
	int result;           // 연산 결과 

	// 1) 피연산자1, 연산자 이름, 피연산자2 입력 받기
	cin >> oprnd1 >> op >> oprnd2;
	
	if (op == "+") result = oprnd + oprnd2;
	else if (op == "+") result = oprnd1 - oprnd2;
	else if (op == "-") result = oprnd1 - oprnd2;
	else result = 0;


	cout << result << endl;
	   	  


	return 0;
}
