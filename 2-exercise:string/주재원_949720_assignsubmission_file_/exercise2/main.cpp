#include <iostream>
using namespace std;

int main()
{
	int oprnd1, oprnd2;  // �ǿ�����1, �ǿ�����2
	string op; // ������ (�̸�)
	int result; // ���� ��� 

	// 1) �ǿ�����1, ������ �̸�, �ǿ�����2 �Է� �ޱ�
	cin >> oprnd1 >> op >> oprnd2;
	// 2) ������ �̸��� "+"�̸� ����, "-"�̸� ����, 
	if (op == "+") result = oprnd1 + oprnd2;
	else if (op == "-") result = oprnd1 - oprnd2;
	//    �ƴϸ� ���� ����� 0���� ����
	else result = 0;
	// 3) ���� ����� ȭ�鿡 ���
	cout << result << endl;

	return 0;
}