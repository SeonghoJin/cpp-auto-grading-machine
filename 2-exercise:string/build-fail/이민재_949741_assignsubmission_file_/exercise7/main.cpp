#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int count, wordcount;

	// 완성하시오
	while (cin.eof() == false) {
		getline(cin, line);
		if (line != "") {
			linecount++;

			istringstream ist(line);
			while (ist >> word) {
				wordcount++;
			}
		}
	}

	cout << "Total lines: " << linecount << endl
		<< "Total words: " << wordcount << endl;

	return 0;

}

