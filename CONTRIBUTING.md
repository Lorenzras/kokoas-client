# 貢献の仕方

社内プロジェクトですが、社外の方は気になるコードがあれば、PR歓迎です！

## 体制 <社内>

この段階、ワークフローは頻繁に変わると思いますので、既にやっているものはそのまま、進んでOKです。

本ドキュメントの修正や貢献も歓迎です。Issueを作成して頂いて、そこからPRをお願いします。

詳細： <http://nvie.com/archives/323/>

当プロジェクトのブランチ:

- master
  - リリース可能な完全品質を保証するブランチ。
  - developmentブランチからのマージのみで更新される。
  - masterブランチ上で直接作業したりコミットするのはNG。

- development
  - 開発の主軸になるブランチ。
  - masterブランチから派生させる。
  - developブランチ上で直接作業したりコミットするのはNG。
  - developブランチからfeatureブランチやdocumentブランチを切る。
  - マージされたら該当のfeatureブランチは削除する。

- feature
  - 命名：T[カード番号]-feat-[機能名]-main
  - 例：T104-feat-mitsumori-main
  - 機能名は16文字まで。
  - 機能追加および修正作業を行うためのブランチ。
  - developブランチから派生させる。
  - 直接コミットするのはNG
  - マージされたら該当のsub-featureブランチは削除する。

- sub-feature
  - 命名：T[タスクのカード番号]-feat-T[機能名]-[副機能]-[担当名]
  - 例：T108-feat-mitsumori-buzai-input-ras
  - 機能名は16文字まで。
  - featureから派生させる。
  - 機能名と副機能は12文字まで。

- #fix
  - 命名：[issue番号]-[fix]-[修正箇所]-[担当名]
  - 例：28-feat-mitsumori-buzai-haneishinai-ras
  - featureとdevelopにマージ済みのものの修正の作業を行うブランチ
  - マージされたら該当のfixブランチは削除する。

- hotfix
  - 命名：[issue番号]-[hotfix]-[修正箇所]-[担当名]
  - リリース済みのものの緊急修正用の作業を行うブランチ。
  - masterブランチから派生させる。
  - 修正作業完了後はmasterブランチとdevelopブランチにマージする。
  - マージされたら該当のhotfixブランチは削除する。

## ワークフロー

### 修正

- Issueが存在ているなら、
  - fixブランチの作成
  - 命名：[issue番号]-[fix]-[修正箇所]-[担当名]
  - 例：28-feat-mitsumori-buzai-haneishinai-ras

- Issue存在していない単独なPRなら、
  - fixブランチを作成する。
  - 命名：[fix]-[修正箇所]-[担当名]
  - 例：fix-feat-mitsumori-buzai-haneishinai-ras
