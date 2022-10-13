#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // 피연산자1, 피연산자2
	string op;            // 연산자 (이름)
	int result;           // 연산 결과 

	cin >> oprnd1 >> op >> oprnd2; // 1) 피연산자1, 연산자 이름, 피연산자2 입력 받기


	if (op == "+") {
		result = oprnd1 + oprnd2;
	}

	else if (op == "-") {
		result = oprnd1 - oprnd2;
	}

	else result = 0;
	
	// 2) 연산자 이름이 "+"이면 덧셈, "-"이면 뺄셈, 
		//    아니면 연산 결과는 0으로 설정

	cout << result << endl;	// 3) 연산 결과를 화면에 출력

	return 0;
}