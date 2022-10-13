#include <iostream>
#include <sstream>
using namespace std;


int main() {
	string word;
	int count = 0;
	while (cin == "") cin >> word;
	while (cin >> word) count++;
	cout << count;
	return 0;
}

