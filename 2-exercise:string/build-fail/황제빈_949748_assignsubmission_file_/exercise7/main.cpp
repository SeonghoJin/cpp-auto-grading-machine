#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int count, wordcount;

	while (cin.eof() == false) {
		getline(cin, line);
		if (line != "") {
			linecount = linecount + 1;

			istringstream iss(line);
			while (iss >> word) {
				wordcount = wordcount + 1;

			}
		}

	}

	cout << "Total lines: " << linecount << endl
		<< "Total words: " << wordcount << endl;


	// 완성하시오



	return 0;

}

