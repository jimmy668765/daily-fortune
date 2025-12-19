'use client';
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function Home() {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
      setIsWeChat(true);
    }
  }, []);

  const handleSubscribe = () => {
    if (!date) return alert('请先选择出生日期');
    setLoading(true);
    const host = window.location.host;
    // 强制使用 webcal 协议唤起
    window.location.href = `webcal://${host}/api/calendar/subscribe?birth=${date}`;
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F2F2F7] text-[#1D1D1F] flex flex-col items-center justify-center p-6 font-sans">
      {isWeChat && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-2xl">
            <AlertCircle className="w-12 h-12 text-[#FF3B30] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">微信无法直接订阅</h3>
            <p className="text-gray-500 text-sm">请点击右上角 ⋯ <br/>选择 <span className="text-black font-semibold">"在浏览器打开"</span></p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-white/50">
        <div className="bg-gradient-to-br from-[#1c1c1e] to-[#000000] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative z-10">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-inner ring-1 ring-white/20">
              <Sparkles className="w-8 h-8 text-[#FFD60A]" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">每日运势</h1>
            <p className="text-white/60 text-xs font-medium uppercase tracking-[0.2em] mt-2">您的八字专属版</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider ml-1">输入您的生辰</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#F2F2F7] border-none rounded-xl px-4 py-4 text-lg font-medium text-center outline-none focus:ring-2 focus:ring-[#007AFF]/50 transition-all text-[#1D1D1F]"
            />
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading || !date}
            className={`w-full py-4 rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
              ${loading || !date ? 'bg-[#E5E5EA] text-[#8E8E93] cursor-not-allowed' : 'bg-[#007AFF] text-white hover:bg-[#0071E3] shadow-lg shadow-[#007AFF]/30'}`}
          >
            {loading ? '正在排盘...' : '一键订阅运势'}
            {!loading && <ArrowRight className="w-5 h-5 opacity-80" />}
          </button>
          
          <div className="text-center space-y-2">
             <p className="text-[10px] text-[#86868B] flex items-center justify-center gap-1">
               <Calendar className="w-3 h-3" /> WebCal 协议 · 实时更新
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}
