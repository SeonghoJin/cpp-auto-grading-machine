#include <iostream>
#include <string>
using namespace std;


int main() {
	string word;
	int count=0;
		
	// �ϼ��Ͻÿ�
	while (cin >> word) {
		count++;
	}
	cout << "Total: " << count << endl;

	return 0;
}