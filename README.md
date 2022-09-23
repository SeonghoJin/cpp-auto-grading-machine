# cpp-auto-grading-machine

## 실행되는 폴더 구조

```
  +- index.ts
  +- config.ts
  +- *.mission
  |  +- inputs
  |  |  +- input1.txt
  |  |  +- input2.txt
  |  +- ouputs
  |  |  +- output1.txt
  |  |  +- output2.txt
  |  +- [name]_[number]_assignsubmission_file_
  |  |  +- [name]_[number]_assignsubmission_file_.zip
  |  +- build-fail
  |  +- test-fail
```

## 작동 순서
1. [name]_[number]_assignsubmission_file_ 폴더가 아닌 모든 것을 지웁니다. 이때 inputs 폴더 및 ouputs 폴더는 삭제되지 않습니다. (build-fail 폴더 및 test-fail폴더는 자동 생성됨.)
2. [name]_[number]_assignsubmission_file_ 폴더 내부의 [name]_[number]_assignsubmission_file_.zip 파일을 압축해제합니다.
3. 압축 해제된 zip 파일 내부의 cpp 모두를 [name]_[number]_assignsubmission_file_ 폴더로 옮깁니다.
4. [name]_[number]_assignsubmission_file_ 내부에서 cpp, h, c 확장자가 아닌 파일 및 폴더들을 모두 제거합니다.
5. [name]_[number]_assignsubmission_file_ 내부에는 cpp, h, c 확장자인 파일들만 있기 때문에 이를 모두 사용하여 build합니다.
6. build 실패한 폴더는 build-fail 폴더 내부로 옮깁니다.
7. build 성공한 폴더들을 대상으로 test를 실행합니다.
8. test 실패한 폴더들은 test-fail 폴더 내부로 옮깁니다. 

## example

![terminal-example](https://user-images.githubusercontent.com/44808218/192026150-13846996-9dea-4f77-81d3-379dfe3167e3.gif)
![eeee](https://user-images.githubusercontent.com/44808218/192026369-b1b86a13-9c54-44dc-94d8-723c72260882.gif)


