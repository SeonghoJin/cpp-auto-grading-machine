#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // �ǿ�����1, �ǿ�����2
	string op;            // ������ (�̸�)
	int result;           // ���� ��� 

	cin >> oprnd1 >> op >> oprnd2; // 1) �ǿ�����1, ������ �̸�, �ǿ�����2 �Է� �ޱ�


	if (op == "+") {
		result = oprnd1 + oprnd2;
	}

	else if (op == "-") {
		result = oprnd1 - oprnd2;
	}

	else result = 0;
	
	// 2) ������ �̸��� "+"�̸� ����, "-"�̸� ����, 
		//    �ƴϸ� ���� ����� 0���� ����

	cout << result << endl;	// 3) ���� ����� ȭ�鿡 ���

	return 0;
}