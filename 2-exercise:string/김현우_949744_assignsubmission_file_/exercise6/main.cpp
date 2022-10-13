#include <iostream>
#include <string>
using namespace std;


int main() {
	string word;
	int count;

	// 완성하시오
	count = 0;
	while (cin >> word) {
		count = count + 1;
	}

	cout << "Total: " << count << endl;
	return 0;
}

