# Pull-Request-Test

Pull Request (이하 PR)을 보냈지만, 아직 Merge되지 않았다.

그러나 나는 새로운 PR을 날리고 싶다.

이럴 땐 어떻게 해야 할까?

## 목차

- [시나리오](#시나리오)
- [기록](#기록)
  - [1. feature1 작업 & PR (Merge)](#1-feature1-작업--pr-merge)
  - [2. feature2 작업 & PR (Not Merged)](#2-feature2-작업--pr-not-merged)
  - [3. feature3 작업 & PR (Not Not merged) => draft 상태로 전환](#3-feature3-작업--pr-not-not-merged--draft-상태로-전환)
  - [4. feature2 PR이 Merge될 때까지 feature3 PR draft 상태 유지](#4-feature2-pr이-merge될-때까지-feature3-pr-draft-상태-유지)
  - [5. feature4 작업 & PR](#5-feature4-작업--pr)
- [고민](#고민)
- [결론](#결론)


## 시나리오

![image](https://user-images.githubusercontent.com/62174395/269602209-c239e210-9294-49c9-84d2-395b671e9a4b.png)

1. README.md만 있는 `main` 브랜치에서 `feature1` 브랜치를 생성한다.
2. `feature1`에서 작업한 내용을 PR을 통해 `main` 브랜치에 반영한다. (Merged)
3. `feature1` 작업 내용이 반영된 `main` 브랜치에서 `feature2` 브랜치를 생성한다.
4. `feature2`에서 작업한 내용에 대해 PR을 날린다. (Not Merged)
5. 아직 `feature2` 내용이 Merge되지 않았지만, 여전히 `feature2`의 작업 내용을 기반으로 `feature3` 브랜치에서 작업을 이어가야 한다.

## 기록

### 1. feature1 작업 & PR (Merge)
```bash
(in main)
git switch -c feature1

vim Library.js
```

```javascript
const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

```

```bash
git add .
git commit -m "c1: 책 리스트 생성"
git push origin feature1
```

Pull Request 작성 (into main from feature1) → Merge

### 2. feature2 작업 & PR (Not Merged)
```bash
git switch main
git pull

git switch -c feature2

vim Library.js
```

```javascript
const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

const borrowBook = (title) => {
    return books.filter(book => book !== title);
}

const leftBooks = borrowBook("The Maze Runner");
console.log(leftBooks);
```

```bash
git add .
git commit -m "c2: 책 대출 함수 생성 및 사용"
git push origin feature2
```

Pull Request 작성 (into main from feature2) → Merge X

### 3. feature3 작업 & PR (Not Not merged) => `draft 상태로 전환`

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/929f7e61-2624-4346-9065-edc91656b0ca)

```bash
git switch main
git switch -c feature3

git rebase feature2 # feature2 작업 내용을 사용하기 위함

vim Library.js
```

```javascript
const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

const borrowBook = (title) => {
    return books.filter(book => book !== title);
}

const returnBook = (currentBooks, title) => {
    return [...currentBooks, title];
}

const leftBooks = borrowBook("The Maze Runner");
console.log(leftBooks);

const leftBooks2 = returnBook(leftBooks, "The Maze Runner");
console.log(leftBooks2);
```

```bash
git add .
git commit -m "c3: 책 반납 함수 생성 및 사용"
git push origin feature3
```

Pull Request 작성하면, feature2 브랜치에서 작업한 커밋 내역도 함께 올라간다. (into main from feature3)

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/c2c42de7-51b8-4348-8ae1-64bc9cd00961)

이럴 때는 `c3: 책 반납 함수 생성 및 사용` PR을 잠시 `draft` 상태로 전환한다.
`draft` 상태는 아직 PR에 올린 내용이 작업 중이니 PR을 Merge를 할 수 없도록 잠시 막는 것이다.

draft 상태로 전환한 PR 하단에는 아래 문구가 출력된다. 작업을 완료하여 다시 리뷰 받을 준비가 되었다면 `Ready for review` 버튼을 클릭하여 `draft` 상태에서 `open` 상태로 전환한다.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/0a26b7c4-e520-480a-9cc2-9107e009a577)

### 4. feature2 PR이 Merge될 때까지 feature3 PR draft 상태 유지

feature2에서 날린 `c2: 책 대출 함수 생성 및 사용` PR이 Merge 됐다.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/5ebe4653-2a8d-44c4-8b4e-16de15a93086)

그러면 feature3에서 날린 PR로 이동해서 `Ready to review` 버튼을 클릭하자.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/4f12665f-93d6-4a72-8c1c-0705e4427b5f)

... 근데 feature2에서 작업한 commit 기록(c2)까지 남아 있다. 다른 방법이 없을까?

### 5. feature4 작업 & PR
![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/6cf522ae-5c4c-484f-9545-fce2211cc544)

feature2가 Merge 됐고, feature3은 아직 Merge되지 않은 상황이다. 이번에는 `main`에서 switch하지 말고, `feature3`에서 switch -c로 `feature4` 브랜치를 생성하자.

```bash
git switch -c feature4
vim Library.js
```

```javascript
const books = [
    "Harry Potter and the Sorcerer's Stone",
    "The Maze Runner"
]

const borrowBook = (title) => {
    return books.filter(book => book !== title);
}

const returnBook = (currentBooks, title) => {
    return [...currentBooks, title];
}

const leftBooks = borrowBook("The Maze Runner");

const leftBooks2 = returnBook(leftBooks, "The Maze Runner");
```

```bash
git add .
git commit -m "c4: console 출력문 제거"
git push origin feature4
```

이후 PR을 작성하면, 여전히 Merge되지 않은 feature3의 commit 기록도 올라간다.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/f3063eb3-b2a5-46f5-a6a7-5fe12aab79ac)

해당 PR을 draft 상태로 전환 후 feature3 PR을 Merge하여도, 여전히 feature3의 commit 기록이 사라지지 않는다.

내가 원하는 건 feature4 PR을 올릴 땐 feature3에 올린 commit 기록 없이, 깔끔하게 feature4에서 작업한 commit만 올라가길 바랐는데 말이다.

## 고민

![image](https://user-images.githubusercontent.com/62174395/269602209-c239e210-9294-49c9-84d2-395b671e9a4b.png)

만약 위 상태에서 feature3 브랜치를 (어떻게든) 생성하고, PR을 올린다고 할 때...

아직 Merge되지 않은 feature2의 commit 내용까지 feature3 PR 올릴 때 포함되는 것이 합리적인 듯하다.

feature3 PR에 feature2 commit 기록 (`commit2`)가 올라가지 않는다고 가정해 보자. 이때 만약 feature2 PR이 `Close`, 즉 main 브랜치에 Merge되지 않는다면 feature3은 공중에 떠버리는 격이 된다고 생각한다.
commit은 `변경` 기록을 담는 것이다. 가장 최신 commit 기록과 현재 작업 내용의 차이를 기록한다. feature3은 feature2를 기반으로 작업했는데, feature2가 없다면 main에 없다면 feature3의 변경 기록을 어떻게 표현하겠는가? 각 브랜치에서의 변경 코드를 가지고 살펴보자.

- feature1 (commit hash: 1d8e2060)

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/12e63474-6f5c-482f-85c5-ee6d8e9bc139)

- feature2 (commit hash: 30d49ab6)

    - 아래 캡처는 feature2 바로 직전 commit `1d8e2060`과의 차이를 표현하고 있다.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/4eb0139c-ab6a-4216-91ca-5a3630a4e0fa)

- feature3 (commit hash: 6eeb9e4f)
    - 아래 캡처는 feature3 바로 직전 commit `30d49ab6`과의 차이를 표현하고 있다.

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/e464358d-ed2d-4afa-99d1-3f96cdddf898)

그러니, feature3 commit인 `6eeb9e4f`을 feature2 commit인 `30d49ab6`과 비교했는데, feature2 PR이 Close되면 갑자기 feature2 commit `30d49ab6`이 사라지고 feature1 commit `1d8e2060`과 비교해야 한다. 그런데 feature1에서 만들어진 feature2에서 feature3을 작업했는데, 어떻게 feature2 없애고 곧 바로 feature1에서 feature3를 비교할까?

느낌적인 느낌적인 느낌... 설명이 매우 추상적이지만... 어떻게 1에서 3으로 바로 건너뛰냐는 것이다. 1, 2, 3 순서대로 가야지...

## 결론

아직 Merge 되지 않은 feature2에서 새 브랜치 feature3을 만들든,

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/bdb51773-8382-44fa-829f-0d089fd85307)

아직 Merge 되지 않은 feature2가 만들어진 feature1에서 새 브랜치 feature3을 만들어 feature2로 rebase를 하든,

![image](https://github.com/kmi0817/Pull-Request-Test/assets/62174395/929f7e61-2624-4346-9065-edc91656b0ca)

feature3을 PR 올리면 아직 Merge되지 않은 feature2의 commit 기록들까지 함께 올라간다.
나중에 feature2 PR이 Merge 되더라도, feature3 PR에 올라갔던 feature2 commit 기록들은 사라지지 않는다.

따라서 어떤 방식으로 새 브랜치를 생성하든, feature3 같은 브랜치는 앞선 feature2 브랜치가 Merge될 때까지 `draft` 상태를 유지하고, 다시 `Open`할 때 어느 commit부터 확인하면 되는지 코멘트를 남겨주자~