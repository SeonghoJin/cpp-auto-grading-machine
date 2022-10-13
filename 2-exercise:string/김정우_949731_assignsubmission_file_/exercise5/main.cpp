#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {

	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl;

	ostringstream ost;
	ost << "ost: " << num1 << "," << num2 << endl;
	cout << ost.str() << endl;

	cout << "Enter the first and last name (choi kwanghoon): ";

	string line;
	do {                    // 위의 ost로 입력받을 때 엔터입력이 남아있어서 그냥 getline을 하면 엔터가 입력된다.
		getline(cin, line);
	} while (line == "");

	istringstream ist(line);

	string w1, w2;
	ist >> w1 >> w2;

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
