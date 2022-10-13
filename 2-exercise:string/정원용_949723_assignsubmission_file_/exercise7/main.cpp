#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int linecount = 0, wordcount = 0; // ��������&�ʱ�ȭ

	while (cin.eof() == false) {
		getline(cin, line);  // ������ �Է¹޾Ƽ� line�� ����
		if (line != "") {    //������ �ƴϸ� �� ���� ����
			linecount++;

			istringstream ist(line);   // line�� ist�� ����
			while (ist >> word) {      //word�� ist�� �Է��ϸ鼭 �ܾ� ���� ���
				wordcount++; 
			}
		}
	} // �Է��� ���� ������ �ݺ� <���� Ctrl+Z�� ���� �� ����>

	cout << "Total lines: " << linecount << endl
		<< "Total words: " << wordcount << endl; //��� ���

	return 0;
}

