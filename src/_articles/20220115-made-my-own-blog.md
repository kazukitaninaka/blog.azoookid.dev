---
title: "ブログ作ってみた"
createdAt: "2022-01-15"
tags: ["雑記", "tech"]
thumbnail: "/assets/articles/20220115-made-my-own-blog/thumbnail.jpg"
---

## 使用技術

- Next.js
- Notion API（のつもりだった）
- vanilla-extract

## 感想

~~Notion の API があることを知り、ブログの CMS として使えそうだなと思って作ってみた。~~

~~でも冷静に note でよくね！という感じがしている。~~

~~とりあえずしばらく使ってみる。~~

## やっぱり Notion をやめた。

Notion をブログの CMS として使うという案は完璧かと思っていたが、Notion API docs をちゃんと読んでおらず、欠点を一つ見落としていた。

それは、Notion API を叩いて取得した Notion 上にホストされた画像は、期限が 1 時間で切れてしまうということだ。

無論再度リクエストを送れば期限が更新された画像リンクが返ってはくる。

しかし、SSG を前提としているブログサイトにおいて、このためだけにパフォーマンスを落として SSR にはしたくなかったので、Notion でコンテンツ管理をするのはやめることにした。

結果としては、この web アプリケーションと同じリポジトリ内でマークダウン形式でコンテンツを管理し、[react-markdown](https://github.com/remarkjs/react-markdown)というライブラリで md シンタックスを React エレメントに変換して web ページ上にレンダリングすることにした。

毎回記事を追加するごとに自分で slug を考えなきゃいけないのは若干面倒だが、それを除けばブログ執筆体験としては悪くない。

まだ以下の対応ができていないので、今後時間を見つけ次第対応していきたい。

- favicon 設定（いい感じにアイコンを持っていない）
- タグ機能
- 全体的な見た目をもう少し改善する（シンプルすぎる）

ソースコードは[こちら](https://github.com/kazukitaninaka/blog.azoookid.dev)
