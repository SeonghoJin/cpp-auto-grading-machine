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
			count = count + 1;

			istringstream iss(line);

			while (iss >> word) {
				wordcount = wordcount + 1;
			}
		}
	}
	
	cout << "Total lines: " << count << endl
		<< "Total words: " << wordcount << endl;
	
	// �ϼ��Ͻÿ�

	return 0;

}
