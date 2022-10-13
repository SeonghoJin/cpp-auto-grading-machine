#include <iostream>
using namespace std;


int main() {
	string word;
	int count;

	count = 0;
	while (cin >> word) {
		// 새로운 단어 입력됨!
		count = count + 1; // count++
	}
	// EOF(입력 끝)에 도달 : Windows: Ctrl+z , Linux: Ctrl+d


	cout << "Total: " << count << endl;

	return 0;
}
