#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	// ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << "," << num2 << endl; 

	ostringstream ost; 

	ost << "ost: " << num1 << "," << num2; 

	cout << ost.str() << endl;     


	// istringstream
	cout << "Enter the first and last name (choi kwanghoon): ";
	string line;
	do {                    
		getline(cin, line);
	} while (line == "");

	istringstream ist(line); 

	string w1, w2;
	ist >> w1 >> w2;  

	cout << "ist: " << w1 << "," << w2 << endl;

	return 0;
}