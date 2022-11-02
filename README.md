# cpp-auto-grading-machine


1. 코드 다운하기 위해, 초록색 버튼 Code 버튼을 누르고, Download ZIP을 누릅니다. 




2. 필요한 프로그램 설치.

- node v16이상 버전 설치

node를 설치하게 되면 npm도 같이 설치됩니다. 

- g++ 설치



3. 설치가 모두 되어있는지 확인

npm -v

node -v

g++ -v

일부 버전이 다르더라도 괜찮습니다. 





4. CMD 창을 통해, 다운 받았던 폴더 내부로 들어갑니다.

저 같은 경우 현재 path가 Downloads/cpp-auto-grading-machine-master 입니다.



명령어 실행 

npm install

npm run single-test

다음과 같이 화면을 보게 되면, 테스트를 실행시킬 수 있습니다. 



5. config 설정

config에서 빌드와 실행시킬 폴더를 선택하고, input과 output 폴더를 설정할 수 있습니다.

기존에는 다음과 같이 작성되어 있을 것입니다. 



- single-test 폴더 내용 (빌드할 폴더)



- yosepoose-inputs 폴더 내용 (input 값들)



- yosepoose-outputs 폴더 내용 (ouput 값들)





이 config를 수정하여, 테스트할 폴더를 변경할 수 있습니다. 



6. 채점할 수 있는 방법

input과 output 파일들을 올려놓고, 채점한 폴더를 설정합니다. config를 통해서 설정할 수 있습니다. 
npm install은 한번만 실행하면 되기 때문에, 이후로 실행하지 않습니다. 


테스트 하기 위해 npm run single-test 를 실행합니다. 

-----
C++ 과제 자동 채점기
- 멀티 테스트 기능 추가.
- 로그 기능 추가.
- build 실패 로그, test 실패 로그 만드는 기능 추가.
- 쉽게 테스트 할 수 있는 스크립트 추가.
https://github.com/SeonghoJin/cpp-auto-grading-machine 에 접속.

------------

이해가 안되거나, 해보시다가 안되는 부분이 있다면 저에게 말해주세요!
web app으로 만들면 참 좋을 것 같은데,, 
