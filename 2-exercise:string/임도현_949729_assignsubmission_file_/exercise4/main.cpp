#include <iostream>
#include <string>

using namespace std;

int main() {

	string line;
	string word("Input a line : ");
	cout << word;
	getline(cin, line);
	line = word + line;
	cout << line << endl;

	return 0;
}
