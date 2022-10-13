#include <iostream>
#include <string>

using namespace std;

int main() {
  /*string word;

	cout << "Input a word: ";
	cin >> word;
	cout << word << endl;     */

	string line;  // line변수 생성 

	cout << "Inpua a line: ";
	getline(cin, line);	// 한 문장을 입력받음. 엔터가 기준이 되어 줄을 구분함.

	return 0;
}
