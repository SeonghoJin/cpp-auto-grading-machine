#include <iostream>
#include <string>
#include /* �ϼ��Ͻÿ� */ <sstream> // istringstream, ostringstream Ŭ������ ����ϱ� ���� ���
using namespace std;

int main()
{
	// ostringstream
	cout << "Enter two numbers: ";
	int num1, num2;
	cin >> num1 >> num2;

	cout << "cout: " << num1 << " , " << num2 << endl; // cout�� ���� ȭ�鿡 ���� ���
	/* �ϼ��Ͻÿ� */
	ostringstream ost; // ostringstream Ŭ���� ost ��ü�� ����
	
	/* �ϼ��Ͻÿ� */
	ost << "ost : " << num1 << " , " << num2;
	// ost�� "ost: "�� num1�� ","�� num2�� ���  cf. sprintf

	cout << /* �ϼ��Ͻÿ� */ ost.str() << endl; 
	// ost�� ����� ���ڿ��� cout�� ���

	 // istringstream
	cout << "Enter the first and last name ( joo jaewon ) : ";
	string line;
	do {	 // �� �ݺ����� �ʿ��ұ��?

			/* 11�� Line�� �ڵ忡 ���� Enter�� �ԷµǱ� ������ getline��
			������ �Է��� �ǹǷ�, �ݺ����� �ʿ��մϴ�. */

		getline(cin, line);
	} while (line == "");

	/* �ϼ��Ͻÿ� */
	istringstream ist(line);
	// istringstream Ŭ���� ��ü ist�� �����ϰ� line�� �ʱ�ȭ

	string first, last;
	/* �ϼ��Ͻÿ� */
	ist >> first >> last;
	//  ist�κ��� �� �ܾ� w1�� w2�� �Է� ����  cf. sscanf

	cout << "ist : " << first << " , " << last << endl;


	return 0;
}