import { useState } from 'react';
import { CheckCircle2, Circle, GitPullRequest, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const phases = [
  {
    version: 'v1.0',
    title: 'The Foundation',
    status: 'Live',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    items: [
      { name: 'The Essentials', desc: 'Predefined vibrant coupons for instant gifting.' },
      { name: 'Personalization', desc: 'Dynamic "Mom\'s Name" integration.' },
      { name: 'Instant Sharing', desc: 'High-quality image generation for WhatsApp/iMessage.' },
      { name: 'Mobile-First Design', desc: 'A "fabulous" UI built for the thumb-scrolling generation.' }
    ]
  },
  {
    version: 'v2.0',
    title: 'The Personal Creator',
    status: 'In Progress',
    statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
    items: [
      { name: 'Custom Prompts', desc: 'Allow users to write their own unique coupon favors.' },
      { name: 'AI Imagery', desc: 'Integration with DALL-E or Stable Diffusion to generate custom card art based on the favor.' },
      { name: 'Theme Engine', desc: 'Switchable palettes for birthdays, Father’s Day, and "Just Because."' }
    ]
  },
  {
    version: 'v3.0',
    title: 'The Connection Ledger',
    status: 'Coming Soon',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    items: [
      { name: 'User Accounts', desc: 'A secure space to save sent and received coupons.' },
      { name: 'Redemption Tracking', desc: 'A "Mark as Redeemed" feature with confetti celebrations.' },
      { name: 'Reminders', desc: 'Gentle nudges to "Check in on your promises."' }
    ]
  },
  {
    version: 'v4.0',
    title: 'Community & Scale',
    status: 'Community Input Needed',
    statusColor: 'bg-purple-100 text-purple-700 border-purple-200',
    items: [
      { name: 'Open API', desc: 'Let developers build "MomCredits" into other platforms.' },
      { name: 'Community Themes', desc: 'A marketplace for artists to contribute "Fabulous" card designs.' },
      { name: 'Global Kindness Map', desc: 'An anonymous, real-time visualization of gestures being shared worldwide.' }
    ]
  }
];

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number>(0);

  return (
    <div className="pb-32 pt-12 px-4 max-w-4xl mx-auto relative animate-in fade-in duration-500">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-sunset-500 to-purple-600 mb-6 drop-shadow-sm">
          Building the Future of Giving
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          From a Mother’s Day MVP to a global movement of intentional gestures.
        </p>
      </div>

      <div className="relative border-l-4 border-rose-200 ml-4 md:ml-8 mb-24 space-y-12">
        {phases.map((phase, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[14px] top-6 w-6 h-6 rounded-full bg-white border-4 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] z-10" />
            
            <div 
              onClick={() => setExpandedPhase(expandedPhase === idx ? -1 : idx)}
              className="glassmorphism bg-white/70 p-6 md:p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer border border-white/50 relative overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-xl border border-rose-100 shadow-sm">
                    {phase.version}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 font-serif">
                    {phase.title}
                  </h2>
                </div>
                <div className={`self-start sm:self-auto px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm ${phase.statusColor}`}>
                  {phase.status}
                </div>
              </div>

              <div className={`mt-6 grid gap-4 transition-all duration-500 overflow-hidden ${expandedPhase === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100'}`}>
                <div className="min-h-0 space-y-4">
                  {phase.items.map((item, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-3">
                        {idx === 0 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                        {item.name}
                      </h4>
                      <p className="text-slate-600 text-[15px] ml-8">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:hidden mt-4 text-center text-slate-400 group-hover:text-rose-500 transition-colors">
                {expandedPhase === idx ? <ChevronUp className="mx-auto" /> : <ChevronDown className="mx-auto" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Call-to-Action */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 p-[3px] rounded-[3rem] shadow-2xl relative overflow-hidden mt-10">
        <div className="bg-slate-900/60 backdrop-blur-xl p-10 md:p-14 rounded-[calc(3rem-3px)] text-center relative z-10">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
            <GitPullRequest className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Build With Us</h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            MomCredits is open source and community-driven. Help us build the ultimate toolkit for intentional giving.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com/domainschool/MomCredits" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-indigo-500/30"
            >
              <GitPullRequest className="w-5 h-5" />
              Contribute on GitHub
            </a>
            <a 
              href="https://www.linkedin.com/posts/activity-7459316818449440768-YWB5?utm_source=share&utm_medium=member_desktop&rcm=ACoAABuRjIoBWY2VkatWD9tSfb8aqZNIaAcuNMI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center gap-3 transition-colors border border-white/20"
            >
              <Lightbulb className="w-5 h-5" />
              Submit an Idea
            </a>
          </div>
        </div>
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
      </div>

    </div>
  );
}
