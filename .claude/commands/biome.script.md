# Biome リントチェック

Biomeでリントのルールをパスしているかチェックします。

## 実行コマンド

```bash
pnpm run lint
```

## 自動修正

```bash
pnpm run format
```

---

## Biome 推奨ルール解説

Biomeは「Rome」の後継ツールで、高速かつシンプルな設定が特徴です。
`recommended: true` で有効になる主要ルールをカテゴリ別に解説します。

---

### 1. バグを未然に防ぐ (Suspicious)

論理的なエラーや意図しない動作を検知します。

| ルール | 説明 |
|--------|------|
| `noDoubleEquals` | `==` ではなく `===` を使用 |
| `noImplicitAnyLet` | 型推論できない `let` 宣言を禁止 |
| `noArrayIndexKey` | 配列インデックスを `key` に使用禁止 |
| `noExplicitAny` | `any` 型の明示的使用を警告 |
| `noDebugger` | `debugger` 文を禁止 |

### 2. コードの品質と一貫性 (Style / Correctness)

チーム開発での書き方の統一を促進します。

| ルール | 説明 |
|--------|------|
| `useConst` | 再代入されない変数は `const` を使用 |
| `useTemplate` | 文字列結合より テンプレートリテラル を推奨 |
| `noUnusedVariables` | 未使用変数の削除 |
| `useImportType` | 型のみのインポートには `import type` を使用 |
| `noVar` | `var` ではなく `let` / `const` を使用 |

### 3. アクセシビリティ (A11y)

スクリーンリーダーやキーボード操作への対応をチェックします。

| ルール | 説明 |
|--------|------|
| `useAltText` | `img` タグに `alt` 属性を必須 |
| `useKeyWithClickEvents` | `onClick` には `onKeyDown` 等も必要 |
| `noLabelWithoutControl` | `label` に関連付けられた入力要素が必要 |
| `useButtonType` | `button` に `type` 属性を明示 |

### 4. セキュリティ (Security)

XSSなどのセキュリティリスクを検知します。

| ルール | 説明 |
|--------|------|
| `noDangerouslySetInnerHtml` | `dangerouslySetInnerHTML` の使用を警告 |

### 5. インポート整理 (Assist)

インポート文の自動整理を行います。

| ルール | 説明 |
|--------|------|
| `organizeImports` | インポート文をアルファベット順にソート |

---

## 設定ファイル (biome.json)

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    },
    "domains": {
      "next": "recommended",
      "react": "recommended"
    }
  }
}
```

> `recommended: true` でPrettier + ESLintの良いとこ取りが即座に利用可能です。

---

## 特定ルールの無効化

プロジェクト固有の理由でルールを無効にする場合:

```json
{
  "linter": {
    "rules": {
      "recommended": true,
      "suspicious": {
        "noUnknownAtRules": "off"
      }
    }
  }
}
```
