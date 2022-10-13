#include <iostream>
#include /* 완성하시오 */      // string 연산자 ==를 사용하기 위해 필요한 헤더 파일

using namespace std;


int main() {
        string input;
	string s1, s2, s3;    // 문자열 변수 s1, s2, s3를 선언   cf. char s1[SIZE], s2[SIZE], s3[SIZE];

	cin >> input;
	s1 = "hello";
	s2 = input;
	s3 = s1 + s2;

	cout << s1 << endl;
	cout << s2 << endl;
	cout << s3 << endl;

	   	return 0;
}
