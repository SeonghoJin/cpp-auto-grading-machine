#include <iostream>

using namespace std;


int main() {
	string word;
	int count;

	// �ϼ��Ͻÿ�
	count = 0;
	while (cin >> word) {
		count += 1;
	}
	cout << "Total: " << count << endl;

	return 0;
}

 