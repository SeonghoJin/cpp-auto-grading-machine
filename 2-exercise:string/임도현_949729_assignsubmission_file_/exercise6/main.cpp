#include <iostream>

using namespace std;


int main() {
	string word;
	int count;
	count = 0;
	while (cin >> word) { // 또는 cin.eof() == false 입력의 끝은 window에서 ctrl+z, 리눅스에서 ctrl+d
		count++;
	}
	cout << "Total : " << count << endl;
	return 0;
}