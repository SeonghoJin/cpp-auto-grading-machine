#include <iostream>
#include /* �ϼ��Ͻÿ� */      // string ������ ==�� ����ϱ� ���� �ʿ��� ��� ����

using namespace std;


int main() {
        string input;
	string s1, s2, s3;    // ���ڿ� ���� s1, s2, s3�� ����   cf. char s1[SIZE], s2[SIZE], s3[SIZE];

	cin >> input;
	s1 = "hello";
	s2 = input;
	s3 = s1 + s2;

	cout << s1 << endl;
	cout << s2 << endl;
	cout << s3 << endl;

	   	return 0;
}
