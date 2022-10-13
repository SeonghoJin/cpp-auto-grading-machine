#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int count, wordcount;

	// 완성하시오
	count = 0;
	wordcount = 0;
	while (cin.eof() == false) {
		count += 1;
		getline(cin, line);
		
		istringstream ist(line);
		while (ist >> word) {
			wordcount += 1;
		}
	}
	cout << "Total lines: " << count << endl;
	cout << "Total Words: " << wordcount << endl;
	return 0;
}