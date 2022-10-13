#include <iostream>
#include <sstream> // ostringstream, istringstream
using namespace std;

int main() {
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl;

	ostringstream ost;
	ost << "ost: " << num1 << "," << num2;
	cout << ost.str() << endl;

	cout << "Enter the first and last name (choi kwanghoon) : ";
	string line;
	do {
		getline(cin, line);
	} while (line == "");

	istringstream ist(line);

	string first, last;
	ist >> first >> last;
	cout << "ist: " << first << "." << last << endl;

	return 0;
}