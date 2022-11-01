#include <iostream>
using namespace std;

#include "node.h"

void printCycle(Node* list) {
	int a = list->getName();
	do{
		cout << list->getName() << " ";
		list = list->getNext();
	} while (list->getName() != a);
	cout << endl;
	// 원형 사이클 리스트를 list가 가르키는 노드부터 차례대로 이름을 한 줄 출력
}

int main() {
	cout << "How many our forces? ";
	int N;
	cin >> N;

	Node* next = new Node(N);
	Node* last = next;

	Node* ptr;

	for (int i = N-1; i >= 1; i--) {
		ptr = new Node(i);
		ptr->setNext(next);
		next = ptr;
	}
	last->setNext(next);

	Node* list = next;

	int count = N;

	for (int i = 0; i < N; i++) {
		cout << list->getName() << " ";
		list = list->getNext();
	}
	cout << endl;

	while (count > 1) {
		list->setNext(list->getNext()->getNext());
		printCycle(list);
		list = list->getNext();
		count--;
	}

	return 0;
}