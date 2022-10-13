#include <iostream>
#include <string>
#include /* 완성하시오 */ <sstream> // istringstream, ostringstream 클래스를 사용하기 위한 헤더
using namespace std;

int main()
{
	// ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << " , " << num2 << endl; // cout을 통해 화면에 직접 출력
	/* 완성하시오 */
	ostringstream ost; // ostringstream 클래스 ost 객체를 선언
	
	/* 완성하시오 */
	ost << "ost : " << num1 << " , " << num2;
	// ost에 "ost: "와 num1과 ","와 num2를 출력  cf. sprintf

	cout << /* 완성하시오 */ ost.str() << endl; 
	// ost에 출력한 문자열을 cout에 출력

	 // istringstream
	cout << "Enter the first and last name ( joo jaewon ) : ";
	string line;
	do {	 // 왜 반복문이 필요할까요?

			/* 11번 Line의 코드에 의해 Enter가 입력되기 때문에 getline에
			공백이 입력이 되므로, 반복문이 필요합니다. */

		getline(cin, line);
	} while (line == "");

	/* 완성하시오 */
	istringstream ist(line);
	// istringstream 클래스 객체 ist를 선언하고 line을 초기화

	string first, last;
	/* 완성하시오 */
	ist >> first >> last;
	//  ist로부터 두 단어 w1과 w2를 입력 받음  cf. sscanf

	cout << "ist : " << first << " , " << last << endl;


	return 0;
}