#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // �ǿ�����1, �ǿ�����2
	string op;            // ������ (�̸�)
	int result;           // ���� ��� 

	cin >> oprnd1 >> op >> oprnd2;

	if (op == "+") result = oprnd1 + oprnd2;
	else if (op == "-") result = oprnd1 - oprnd2;
	else result = 0;

	cout << result;

	return 0;
}
