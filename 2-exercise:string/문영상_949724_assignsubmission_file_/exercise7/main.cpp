#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int linecount=0, wordcount=0;

	// �ϼ��Ͻÿ�
	while (cin.eof() == false) {
		getline(cin, line);

		if (line != "") {     //���鸸 �ִ°� üũ���ϴ� ����
			linecount++;

			istringstream iss(line);

			while (iss>>word) {
				wordcount++;
			}

		}
	}


	cout << "Total lines : " << linecount << endl
		<< "Total words: " << wordcount << endl;


	return 0;

}

