#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main()
{
	string line, word;
	int linecount = 0, wordcount = 0;

	// 완성하시오
	while (cin.eof() == false)
	{
		getline(cin, line);
		if (line != "")
		{
			linecount += 1;

			istringstream iss(line);
			while (iss >> word)
			{
				wordcount++;
			}
		}
	}

	cout << "Total lines" << linecount << endl
		 << "Total words" << wordcount << endl;

	return 0;
}
