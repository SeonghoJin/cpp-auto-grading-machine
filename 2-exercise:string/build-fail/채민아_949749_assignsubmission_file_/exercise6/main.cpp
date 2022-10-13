#include <iostream>

using namespace std;


int main() {
	string word;
	int count=0;

    while(cin >> word) {//EOF
        //새로운 단어 입력됨 !
        count = count + 1; //count++;
    }
    
    cout << "Total: " << count << endl;
    
	return 0;
}

