#include <iostream>

using namespace std;

int main() {
	int width, height;

	cin >> width >> height; // 너비와 높이 를 입력

	cout << width << " x " << height
		<< " = " << width * height
		<< endl;

	return 0;
}