#include <iostream>
#include <string>

using namespace std;

int main() {
	string word;// string word;

	cout << "Input a word: "; //cout << "Input a word: ";
	cin >> word; //cin >> word;
	cout << word << endl; //cout << word << endl;

	string line;

	getline(cin, line); 
	cout << line << endl; // �ϼ��Ͻÿ�

	return 0;
}