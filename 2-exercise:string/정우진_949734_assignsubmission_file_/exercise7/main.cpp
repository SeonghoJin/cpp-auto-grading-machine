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
			count += 1;
			istringstream iss(line);
			while (iss >> word) {
				wordcount += 1;
			}
		}
	}

	cout << "total line : " << count << endl;
	cout << "total words : " << wordcount << endl;

	// 완성하시오



	return 0;

}

