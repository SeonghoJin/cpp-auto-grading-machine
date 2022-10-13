#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line, word;
	int linecount, wordcount;
    while(cin.eof()==false){
        getline(cin, line); //한줄 입력받기
        if(line != ""){
            linecount = linecount + 1;
            istringstream iss(line);
            while ( iss>>word){
                wordcount == wordcount+1;
            }
        }
        
    }
    
    cout << "Total lines : "<< linecount << endl << "Total words " << wordcount << endl;





	return 0;

}

