#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   // �ǿ�����1, �ǿ�����2
	string op;            // ������ (�̸�)
	int result;           // ���� ��� 

	// 1) �ǿ�����1, ������ �̸�, �ǿ�����2 �Է� �ޱ�
	cout << "�ǿ�����1, ������(+,-), �ǿ�����2�� ���ʴ�� �Է��ϼ���" << endl;
	cin >> oprnd1 >> op >> oprnd2;

	// 2) ������ �̸��� "+"�̸� ����, "-"�̸� ����, 
        //    �ƴϸ� ���� ����� 0���� ����
	if(op == "+") cout << oprnd1 + oprnd2;
	else if (op == "-") cout << oprnd1 - oprnd2;
	else cout << "0";


        // 3) ���� ����� ȭ�鿡 ���



	return 0;
}
