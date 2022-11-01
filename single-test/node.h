#pragma once

class Node {
	int name;
	Node* next;
public:
	Node(int name);
	int getName() { return name; }
	void setName(int name) { this->name = name; }
	Node* getNext() { return next; }
	void setNext(Node* next) { this->next = next; }

};