#include <iostream>

using namespace std;

int main()
{
	string word;
	int count = 0;

	// 완성하시오
	// 단어가 입력이 끝날 때까지 받도록 하는게 핵심

	while (cin >> word)
	{
		// 새로운 단어 입력 됨!
		count++;
	}
	// EOF(입력 끝)에 도달, 윈도우에서는 Ctrl+ Z로 끝낼 수 있음
	cout << "Total: " << count << endl;
	return 0;
}
