#include <iostream>
#include <string>
#include <sstream>/* �ϼ��Ͻÿ� */     // istringstream, ostringstream Ŭ������ ����ϱ� ���� ���
using namespace std;

int main() {
	// ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout�� ���� ȭ�鿡 ���� ���

													 /* �ϼ��Ͻÿ� */      // ostringstream Ŭ���� ost ��ü�� ����
	ostringstream ost;
																	  /* �ϼ��Ͻÿ� */      // ost�� "ost: "�� num1�� ","�� num2�� ���  cf. sprintf
	ost << "ost: " << num1 << "," << num2;
	cout << ost.str() << endl;     // ost�� ����� ���ڿ��� cout�� ���


									 // istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";

	string line;
	do {                    // �� �ݺ����� �ʿ��ұ��?
		getline(cin, line);
	} while (line == "");

	/* �ϼ��Ͻÿ� */       // istringstream Ŭ���� ��ü ist�� �����ϰ� line�� �ʱ�ȭ
	istringstream ist(line);

	string w1, w2;
	/* �ϼ��Ͻÿ� */       //  ist�κ��� �� �ܾ� w1�� w2�� �Է� ����  cf. sscanf
	ist >> w1 >> w2;
	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
