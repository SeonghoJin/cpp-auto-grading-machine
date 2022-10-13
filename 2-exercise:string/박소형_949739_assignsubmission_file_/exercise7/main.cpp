#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int linecount=0, wordcount=0;
	while (cin.eof() == false) {
		getline(cin, line);// 한 줄을 입력 받기 (line)
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



	return 0;

}