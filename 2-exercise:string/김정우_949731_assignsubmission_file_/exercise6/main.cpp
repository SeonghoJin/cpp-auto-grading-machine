#include <iostream>

using namespace std;


int main() {
	string word;
	int count = 0;

	while (cin >> word) {
		count++;
	}
	cout << "Total: " << count << endl;
	return 0;
}

