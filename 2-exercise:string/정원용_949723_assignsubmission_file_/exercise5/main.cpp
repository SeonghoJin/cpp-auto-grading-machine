#include <iostream>
#include <string>
#include <sstream>     // istringstream, ostringstream Ŭ������ ����ϱ� ���� ���

using namespace std;

int main() {
	// ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout�� ���� ȭ�鿡 ���� ���

	ostringstream ost;// ostringstream Ŭ���� ost ��ü�� ����

	ost << "ost: " << num1 << ", " << num2;    // ost�� "ost: "�� num1�� ","�� num2�� ���  cf. sprintf

	cout << ost.str() << endl;     // ost�� ����� ���ڿ��� cout�� ���


	// istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";

	string line;
	do {                    //Q: �� �ݺ����� �ʿ��ұ��? 													
		getline(cin, line); //A: �տ��� �̹� ���͸� �ѹ� �Ʊ� ������ �� �ڵ带 �����ϸ�
	} while (line == "");   /*line�� �Է��� ���ڿ��� �Է����� ���ϴ� ��찡 ���� �� �ִ�.
			���� �̸� �����ϱ� ���� ���ͷ� ���� ���ٷ� �����ϸ� �� �� �� �ް� �ϴ� ���̴�.*/
	istringstream ist(line);       // istringstream Ŭ���� ��ü ist�� �����ϰ� line�� �ʱ�ȭ

	string w1, w2;
	ist >> w1 >> w2;      //  ist�κ��� �� �ܾ� w1�� w2�� �Է� ����  cf. sscanf

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
