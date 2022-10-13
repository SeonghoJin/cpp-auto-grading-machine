#include <iostream>
#include<string> //getline
using namespace std;

int main() {
	string line;
		// string word;

	cout << "Input a line: ";
	getline(cin, line);
	cout << line << endl;

	return 0;
}
