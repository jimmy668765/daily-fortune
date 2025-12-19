```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Solar } from 'lunar-javascript';
import { v4 as uuidv4 } from 'uuid';
import COPYWRITING_DB from '@/data/copywriting.json'; 

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const TEN_GODS_KEY = ["比肩", "劫财", "食神", "伤官", "偏财", "正财", "七杀", "正官", "偏印", "正印"];

const LIFE_STAGE_TABLE: Record<string, string[]> = {
  "甲": ["沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养","长生"],
  "乙": ["病","衰","帝旺","临官","冠带","沐浴","长生","养","胎","绝","墓","死"],
  "丙": ["胎","养","长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝"],
  "丁": ["绝","墓","死","病","衰","帝旺","临官","冠带","沐浴","长生","养","胎"],
  "戊": ["胎","养","长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝"],
  "己": ["绝","墓","死","病","衰","帝旺","临官","冠带","沐浴","长生","养","胎"],
  "庚": ["死","墓","绝","胎","养","长生","沐浴","冠带","临官","帝旺","衰","病"],
  "辛": ["长生","养","胎","绝","墓","死","病","衰","帝旺","临官","冠带","沐浴"],
  "壬": ["帝旺","衰","病","死","墓","绝","胎","养","长生","沐浴","冠带","临官"],
  "癸": ["临官","冠带","沐浴","长生","养","胎","绝","墓","死","病","衰","帝旺"],
};

function mapStageToLevel(stage: string): 'High' | 'Mid' | 'Low' {
  if (['长生', '冠带', '临官', '帝旺'].includes(stage)) return 'High';
  if (['衰', '病', '胎', '养'].includes(stage)) return 'Mid';
  return 'Low';
}

function getCopywriting(tenGod: string, lifeStage: string): string {
  // @ts-ignore
  const godData = COPYWRITING_DB[tenGod];
  if (!godData) return `能量：${tenGod} | 状态：${lifeStage}`;
  let list: string[] = [];
  if (Array.isArray(godData)) { list = godData; } 
  else { 
    // @ts-ignore
    const level = mapStageToLevel(lifeStage);
    list = godData[level] || godData['Mid'] || [];
  }
  if (list.length === 0) return `运势：${tenGod} 坐 ${lifeStage}`;
  return list[Math.floor(Math.random() * list.length)];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const birthStr = searchParams.get('birth');
  if (!birthStr) return NextResponse.json({ error: 'Missing birth' }, { status: 400 });

  try {
    const birthDate = new Date(birthStr);
    const userSolar = Solar.fromYmd(birthDate.getFullYear(), birthDate.getMonth() + 1, birthDate.getDate());
    const dayMaster = userSolar.getLunar().getDayGan();
    const dmIndex = STEMS.indexOf(dayMaster);

    const icsHeader = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Tars//Daily Fortune//CN",
      `X-WR-CALNAME:每日运势 (${dayMaster}日主版)`, // 已更新名称
      "X-WR-TIMEZONE:Asia/Shanghai",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    let events = [];
    const branchMap = BRANCHES.reduce((acc, b, i) => ({...acc, [b]: i}), {} as Record<string, number>);
    const start = new Date('2026-01-01');
    const end = new Date('2026-12-31');

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const solar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
      const lunar = solar.getLunar();
      const dayGan = lunar.getDayGan();
      const dayZhi = lunar.getDayZhi();
      const tenGod = TEN_GODS_KEY[(STEMS.indexOf(dayGan) - dmIndex + 10) % 10];
      const lifeStage = LIFE_STAGE_TABLE[dayMaster][branchMap[dayZhi]];
      const copy = getCopywriting(tenGod, lifeStage);
      const dateStr = d.toISOString().slice(0, 10).replace(/-/g, '');
      const emoji = tenGod === '偏财' ? '💰' : (tenGod === '七杀' ? '⚡' : '🔮');

      events.push([
        "BEGIN:VEVENT",
        `UID:${uuidv4()}`,
        `DTSTART;VALUE=DATE:${dateStr}`,
        `SUMMARY:${emoji} ${tenGod} · ${lifeStage}`,
        `DESCRIPTION:${copy.replace(/\n/g, '\\n')}\\n\\n👉 每日运势 · 八字专属`,
        "END:VEVENT"
      ].join('\r\n'));
    }
    return new NextResponse([...icsHeader, ...events, "END:VCALENDAR"].join('\r\n'), {
      status: 200,
      headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'inline; filename="fortune.ics"' },
    });
  } catch (e) { return NextResponse.json({ error: 'Server Error' }, { status: 500 }); }
}
```
