import {
  ArrowLeft,
  ArrowUpDown,
  BookMarked,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Monitor,
  Moon,
  Palette,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";

interface HelpSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function HelpSection({ icon, title, children }: HelpSectionProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
        {icon}
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

interface StepProps {
  number: number;
  children: React.ReactNode;
}

function Step({ number, children }: StepProps) {
  return (
    <div className="flex gap-3">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        {number}
      </span>
      <div>{children}</div>
    </div>
  );
}

interface IconBadgeProps {
  icon: React.ReactNode;
  label: string;
}

function IconBadge({ icon, label }: IconBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
      {icon}
      {label}
    </span>
  );
}

export default function HelpPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">使い方ガイド</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            ホームに戻る
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              書籍管理アプリの使い方
            </h2>
            <p className="mt-2 text-muted-foreground">
              読書の進捗を管理するシンプルなアプリです
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* 書籍の追加 */}
            <HelpSection
              icon={<Plus className="h-5 w-5 text-primary" />}
              title="書籍の追加方法"
            >
              <div className="flex flex-col gap-3">
                <Step number={1}>
                  画面右上の{" "}
                  <IconBadge
                    icon={<Plus className="h-3 w-3" />}
                    label="書籍を追加"
                  />{" "}
                  ボタンをクリック
                </Step>
                <Step number={2}>
                  フォームに書籍情報を入力します：
                  <ul className="mt-2 ml-4 list-disc space-y-1">
                    <li>
                      <strong>タイトル</strong>（必須）- 書籍の名前
                    </li>
                    <li>
                      <strong>URL</strong>（任意）- Amazonなどの購入ページ
                    </li>
                    <li>
                      <strong>表紙画像URL</strong>（任意）- 表紙画像のURL
                    </li>
                    <li>
                      <strong>総ページ数</strong>（必須）- 本の全ページ数
                    </li>
                    <li>
                      <strong>現在のページ</strong> - 今読んでいるページ
                    </li>
                    <li>
                      <strong>ステータス</strong> - 未読/読書中/完読
                    </li>
                  </ul>
                </Step>
                <Step number={3}>「追加」ボタンで保存されます</Step>
              </div>
            </HelpSection>

            {/* 編集・削除 */}
            <HelpSection
              icon={<Pencil className="h-5 w-5 text-primary" />}
              title="書籍の編集・削除"
            >
              <div className="flex flex-col gap-3">
                <p>
                  書籍カードにマウスを乗せると、下部にボタンが表示されます：
                </p>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <IconBadge
                      icon={<Pencil className="h-3 w-3" />}
                      label="編集"
                    />
                    <span>- 書籍情報を修正</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconBadge icon={<Trash2 className="h-3 w-3" />} label="" />
                    <span>- 書籍を削除</span>
                  </div>
                </div>
                <p className="mt-2 text-warning">
                  ※
                  削除は確認ダイアログが表示されます。一度削除すると元に戻せません。
                </p>
              </div>
            </HelpSection>

            {/* 検索・フィルター */}
            <HelpSection
              icon={<Search className="h-5 w-5 text-primary" />}
              title="検索・フィルター・ソート"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Search className="h-4 w-4" />
                    検索
                  </div>
                  <p className="mt-1">
                    検索バーにタイトルを入力すると、リアルタイムで絞り込みます
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Filter className="h-4 w-4" />
                    フィルター
                  </div>
                  <p className="mt-1">ステータスで絞り込み：</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <IconBadge
                      icon={<BookOpen className="h-3 w-3" />}
                      label="すべて"
                    />
                    <IconBadge
                      icon={<Clock className="h-3 w-3" />}
                      label="未読"
                    />
                    <IconBadge
                      icon={<BookMarked className="h-3 w-3" />}
                      label="読書中"
                    />
                    <IconBadge
                      icon={<CheckCircle className="h-3 w-3" />}
                      label="完読"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ArrowUpDown className="h-4 w-4" />
                    ソート
                  </div>
                  <p className="mt-1">
                    「作成日」または「タイトル」で並べ替え。矢印ボタンで昇順/降順を切り替え
                  </p>
                </div>
              </div>
            </HelpSection>

            {/* 読書進捗 */}
            <HelpSection
              icon={<BookMarked className="h-5 w-5 text-primary" />}
              title="読書進捗の管理"
            >
              <div className="flex flex-col gap-3">
                <p>
                  読書の進捗は<strong>ページ数</strong>で管理します：
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>総ページ数と現在のページを入力</li>
                  <li>進捗率（%）は自動で計算されます</li>
                  <li>カードにプログレスバーと%が表示されます</li>
                </ul>
                <div className="mt-2 rounded-lg bg-muted p-3">
                  <p className="text-xs">
                    例：総ページ300、現在ページ150 → <strong>50%</strong>
                  </p>
                </div>
              </div>
            </HelpSection>

            {/* テーマ設定 */}
            <HelpSection
              icon={<Palette className="h-5 w-5 text-primary" />}
              title="テーマ設定"
            >
              <div className="flex flex-col gap-4">
                <p>
                  ヘッダーの設定ボタン（歯車アイコン）からテーマを変更できます：
                </p>
                <div>
                  <div className="font-medium text-foreground">表示モード</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <IconBadge
                      icon={<Sun className="h-3 w-3" />}
                      label="ライト"
                    />
                    <IconBadge
                      icon={<Moon className="h-3 w-3" />}
                      label="ダーク"
                    />
                    <IconBadge
                      icon={<Monitor className="h-3 w-3" />}
                      label="システム"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    テーマカラー
                  </div>
                  <p className="mt-1">5色から選択できます：</p>
                  <div className="mt-2 flex gap-2">
                    <span
                      className="h-6 w-6 rounded-full bg-blue-500"
                      title="Blue"
                    />
                    <span
                      className="h-6 w-6 rounded-full bg-red-500"
                      title="Red"
                    />
                    <span
                      className="h-6 w-6 rounded-full bg-green-500"
                      title="Green"
                    />
                    <span
                      className="h-6 w-6 rounded-full bg-purple-500"
                      title="Purple"
                    />
                    <span
                      className="h-6 w-6 rounded-full bg-orange-500"
                      title="Orange"
                    />
                  </div>
                </div>
              </div>
            </HelpSection>

            {/* バックアップ */}
            <HelpSection
              icon={<Download className="h-5 w-5 text-primary" />}
              title="データのバックアップ"
            >
              <div className="flex flex-col gap-4">
                <p>
                  データはブラウザのLocalStorageに保存されます。
                  バックアップ機能で安全にデータを保管できます：
                </p>
                <div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Download className="h-4 w-4" />
                    エクスポート
                  </div>
                  <p className="mt-1">
                    すべての書籍データをJSONファイルでダウンロード
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Upload className="h-4 w-4" />
                    インポート
                  </div>
                  <p className="mt-1">
                    エクスポートしたJSONファイルを読み込んで復元
                  </p>
                </div>
                <p className="mt-2 text-warning">
                  ※ インポートすると現在のデータは上書きされます
                </p>
              </div>
            </HelpSection>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <BookOpen className="h-5 w-5" />
              書籍管理を始める
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
