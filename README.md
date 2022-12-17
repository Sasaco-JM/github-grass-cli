# github-grass-cli
CLIでGithubユーザーのコミット状況が確認できます。

## インストール方法
コマンドライン上で以下コマンドを実行。
```
$ npm i -g github-grass-cli
```
## 使用方法
### 事前準備
以下2つの情報を準備してください。
- 草を表示したいGithubのアカウント名
-  Githubの個人用アクセストークン

アクセストークンをお持ちで無い方は以下URLのGenerate new token(classic)から`read:user`にチェックを入れてアクセストークンを発行してください。


https://github.com/settings/tokens

<img width="331" alt="image" src="https://user-images.githubusercontent.com/78665068/208248666-1c09a5a6-e958-4225-b86f-5c3787c32218.png">


<img width="772" alt="image" src="https://user-images.githubusercontent.com/78665068/208248733-81418000-9a32-4d6d-ac1d-193a848a075e.png">


### 実行
以下コマンドを実行後、草を表示したいGithubのアカウント名→アクセストークンの順に入力してください。

```
npx github-grass-cli
```
<img width="772" alt="image" src="https://user-images.githubusercontent.com/78665068/208250063-6d10db9b-cccf-442b-9d05-84bcb7000d8f.png">


