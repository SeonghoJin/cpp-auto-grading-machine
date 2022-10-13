#include <iostream>
#include <sstream>

using namespace std;

int main() {
        // ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; // cout을 통해 화면에 직접 출력


	ostringstream ost;
	ost << "ost: " << num1 << "," << num2 << endl;
		cout << "Enter the first and last name (choi kwanghoon): ";

        string line;
	do {                    // 왜 반복문이 필요할까요? 앞에서 한번만 getline을 받으면 공백이 되기때문에
	  getline(cin, line);
	} while (line == "");

	istringstream ist(line);
	
	string w1, w2;
	ist >> w1 >> w2;
		cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}
