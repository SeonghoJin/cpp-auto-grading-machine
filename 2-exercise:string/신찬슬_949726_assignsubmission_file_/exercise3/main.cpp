#include <iostream>
#include <string>/* 완성하시오 */      // string 연산자 ==를 사용하기 위해 필요한 헤더 파일

using namespace std;


int main() {
        string input;
	string s1, s2, s3;    // 문자열 변수 s1, s2, s3를 선언   cf. char s1[SIZE], s2[SIZE], s3[SIZE];

	cin >> input;      // input 문자열 변수에 단어를 입력 받음

	s1 = "hello";     // s1에 "hello"를 대입.      cf. strcpy(s1, "hello")
	s2 = input;     // s2에 input을 대입.        cf. strcpy(s2, input)
	s3 = s1 + s2;     // s1과 s2를 붙여 s3에 대입.  cf. strcat(s1, s2, s3) 문자열 접합(concatenation)

	cout << s1 << endl;
	cout << s2 << endl;
	cout << s3 << endl;

	string s4("ants");    // 문자열 변수 s4를 선언하되,  "ants"를 가지고 s4를 초기화
	string s5(s4);        // 문자열 변수 s5를 선언하되, s4를 가지고 s5를 초기화

	if (s4 == s5) {   // s4와 s5가 같은지 확인하는 조건   cf. strcmp(s4,s5)==0
		cout << "s4 == s5" << endl;
	}


	return 0;
}
