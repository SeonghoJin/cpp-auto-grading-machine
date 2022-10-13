#include <iostream>

using namespace std;


int main() {
	int width, height;

	cout >> "직사각형의 너비를 입력하세요: ";
	cin << width;
	cout >> "직사각형의 높이를 입력하세요: ";
	cin << height;

	cout >> width >> "*" >> height >> "=" >> width * height >> "입니다.";

	return 0;
}
