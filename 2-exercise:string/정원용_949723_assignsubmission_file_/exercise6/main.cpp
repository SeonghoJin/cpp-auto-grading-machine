#include <iostream>

using namespace std;


int main() {
	string word;
	int count = 0;  //���� ����

	while (cin >> word) {  // word�� �Է� �ް� �Է� ���� ������ ī��Ʈ 
		count++;
	} //�����ϰ� �ʹٸ� Ctrl+Z �Է� �� ����
	
	cout << "count: " << count << endl;

	return 0;
}
