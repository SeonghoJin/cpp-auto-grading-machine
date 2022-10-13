#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
        // ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout을 통해 화면에 직접 출력

	ostringstream ost;		

	ost << "ost: " << num1 << "," << num2;

	cout << ost.str() << endl;     // ost에 출력한 문자열을 cout에 출력


        // istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";

        string line;
	do {                    // 왜 반복문이 필요할까요? 이전에 입력한 enter때문에?
	  getline(cin, line);
	} while (line == "");

	istringstream ist(line);

	string w1, w2;
	ist >> w1 >> w2;

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
