#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int linecount = 0, wordcount = 0; // 변수선언&초기화

	while (cin.eof() == false) {
		getline(cin, line);  // 한줄을 입력받아서 line에 저장
		if (line != "") {    //빈줄이 아니면 줄 수를 더함
			linecount++;

			istringstream ist(line);   // line을 ist에 저장
			while (ist >> word) {      //word에 ist를 입력하면서 단어 수를 계산
				wordcount++; 
			}
		}
	} // 입력이 끝날 때까지 반복 <역시 Ctrl+Z로 끝낼 수 있음>

	cout << "Total lines: " << linecount << endl
		<< "Total words: " << wordcount << endl; //결과 출력

	return 0;
}

