# Pull-Request-Test

Pull Request (이하 PR)을 보냈지만, 아직 Merge 않았다.

그러나 나는 새로운 PR을 날리고 싶다.

이럴 땐 어떻게 해야 할까?

## 시나리오

![image](https://user-images.githubusercontent.com/62174395/269602209-c239e210-9294-49c9-84d2-395b671e9a4b.png)

1. README.md만 있는 `main` 브랜치에서 `feature1` 브랜치를 생성한다.
2. `feature1`에서 작업한 내용을 PR을 통해 `main` 브랜치에 반영한다. (Merged)
3. `feature1` 작업 내용이 반영된 `main` 브랜치에서 `feature2` 브랜치를 생성한다.
4. `feature2`에서 작업한 내용에 대해 PR을 날린다. (Not Merged)
5. 아직 `feature2` 내용이 Merge되지 않았지만, 여전히 `feature2`의 작업 내용을 기반으로 `feature3` 브랜치에서 작업을 이어가야 한다.