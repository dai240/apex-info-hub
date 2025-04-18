import { Sword } from 'lucide-react';

export function PageHeader() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
      <div className="flex items-center space-x-2">
        <Sword className="w-8 h-8 text-orange-500" />
        <h1 className="text-4xl font-bold tracking-tight text-orange-500">APEX Info Hub</h1>
      </div>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        最新のマップローテーション、武器データ、レジェンド情報をチェックしよう！
      </p>
    </div>
  );
}