#include <iostream>

using namespace std;


int main() {
	string word;
	int count = 0;  //변수 선언

	while (cin >> word) {  // word를 입력 받고 입력 받은 개수를 카운트 
		count++;
	} //종료하고 싶다면 Ctrl+Z 입력 후 엔터
	
	cout << "count: " << count << endl;

	return 0;
}
