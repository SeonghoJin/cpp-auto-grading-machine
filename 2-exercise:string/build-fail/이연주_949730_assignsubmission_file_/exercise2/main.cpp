#include <iostream>

using namespace std;


int main() {
	int oprnd1, oprnd2;   
	string op;            
	int result;           

	cin>>oprnd1;
	cin>>op;
    cin>>oprnd2;

		if(op=="+") {
			result=oprnd1+oprnd2
		}
		else if (op=="-") {
			result=oprnd1-oprnd2
		}
		else {
			result=0
		}

        cout<<result<<endl;

	return 0;
}
