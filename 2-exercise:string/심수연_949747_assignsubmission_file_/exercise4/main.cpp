#include <iostream>
#include <string> // getline
using namespace std;

int main() {
	string line;

	cout << "input a line : ";
	getline(cin, line);
	cout << line << endl;

	return 0;
}
