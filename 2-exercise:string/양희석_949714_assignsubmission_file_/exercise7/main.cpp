#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int count = 0, wordcount = 0;


	while (cin.eof() == false) {

		getline(cin, line);

		if (line != "") {

			count++;

			istringstream iss(line);

			while (iss >> word) {

				wordcount++;
			}

		}
	}


	cout << "Total lines: " << count << endl
		<< "Total word: " << wordcount << endl;



	return 0;

}

