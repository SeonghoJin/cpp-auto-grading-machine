#include <iostream>
#include <string>/* �ϼ��Ͻÿ� */      // string ������ ==�� ����ϱ� ���� �ʿ��� ��� ����

using namespace std;


int main() {
        string input;
	string s1, s2, s3;    // ���ڿ� ���� s1, s2, s3�� ����   cf. char s1[SIZE], s2[SIZE], s3[SIZE];

	cin >> input;      // input ���ڿ� ������ �ܾ �Է� ����

	s1 = "hello";     // s1�� "hello"�� ����.      cf. strcpy(s1, "hello")
	s2 = input;     // s2�� input�� ����.        cf. strcpy(s2, input)
	s3 = s1 + s2;     // s1�� s2�� �ٿ� s3�� ����.  cf. strcat(s1, s2, s3) ���ڿ� ����(concatenation)

	cout << s1 << endl;
	cout << s2 << endl;
	cout << s3 << endl;

	string s4("ants");    // ���ڿ� ���� s4�� �����ϵ�,  "ants"�� ������ s4�� �ʱ�ȭ
	string s5(s4);        // ���ڿ� ���� s5�� �����ϵ�, s4�� ������ s5�� �ʱ�ȭ

	if (s4 == s5) {   // s4�� s5�� ������ Ȯ���ϴ� ����   cf. strcmp(s4,s5)==0
		cout << "s4 == s5" << endl;
	}


	return 0;
}
