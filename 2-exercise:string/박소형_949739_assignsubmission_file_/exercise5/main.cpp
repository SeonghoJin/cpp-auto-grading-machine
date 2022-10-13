#include <iostream>
#include <string>
#include <sstream> // istringstream, ostringstream Ŭ������ ����ϱ� ���� ���

using namespace std;

int main() {
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout�� ���� ȭ�鿡 ���� ���

	ostringstream ost; // ostringstream Ŭ���� ost ��ü�� ����
	ost << "ost: " << num1 << "," << num2 << endl;    // ost�� "ost: "�� num1�� ","�� num2�� ���  cf. sprintf
    cout << ost.str()  << endl;     // ost�� ����� ���ڿ��� cout�� ���


	// istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";
	string line;
	do {                    // �� �ݺ����� �ʿ��ұ��? 
		// ������ �Է��� �ް� ���͸� �ļ� , �ش� �κп��� �� �Է��� �� �Ǵ� ��찡 ���� �� �ִ�. 
		getline(cin, line);
	} while (line == "");

	istringstream ist(line);     // istringstream Ŭ���� ��ü ist�� �����ϰ� line�� �ʱ�ȭ

	string first, last;
	ist >> first >> last;
	cout << "ist: " << first << "," << last << endl;

	return 0;
}