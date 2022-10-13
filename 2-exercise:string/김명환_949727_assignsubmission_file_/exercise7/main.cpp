#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int count, wordcount;

	count = 0;
	wordcount = 0;

	while (cin.eof() == false) {
		getline(cin, line);
		if (line != "") {
			count = count + 1;

			istringstream ist(line);
			while (ist >> word) {
				wordcount = wordcount + 1;
			}
		}
	}

	cout << "Total lines: " << count << endl
		<< "Total words: " << wordcount << endl;

	return 0;

}

