#!/bin/bash
# Pack Vacation - GitHub Pagesデプロイスクリプト
# github-uploadフォルダ内で実行してください
# 使い方: cd github-upload && bash deploy.sh

echo "=== Pack Vacation デプロイ開始 ==="

# Git初期化（新しいリポジトリとして）
rm -rf .git
git init
git add -A
git commit -m "Pack Vacation LP - 全ページ構成更新"

# リモートを設定してプッシュ
git branch -M main
git remote add origin https://github.com/ouga0315-cpu/pack-vacation-lp.git
git push -u origin main --force

echo ""
echo "=== デプロイ完了！ ==="
echo "2-3分後に以下のURLで確認してください："
echo "  https://ouga0315-cpu.github.io/pack-vacation-lp/"
