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
	cout << line << endl; // 완성하시오

	return 0;
}