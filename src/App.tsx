import { useState, useRef } from 'react';
import { coupons } from './data';
import { Download, X, Sparkles, User, Heart, Gift, Milestone } from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import Roadmap from './Roadmap';

function App() {
  const [currentView, setCurrentView] = useState<'app' | 'roadmap'>('app');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [mothersName, setMothersName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  
  const [customTitle, setCustomTitle] = useState<string>('I Owe You');
  const [customDescription, setCustomDescription] = useState<string>('Describe your special favor here...');
  
  const couponRef = useRef<HTMLDivElement>(null);

  const canGenerate = selectedId && userName.trim() && mothersName.trim();

  const handleGenerate = () => {
    if (!canGenerate) return;
    
    // Confetti Effect
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#f97316', '#8b5cf6', '#facc15'],
      disableForReducedMotion: true
    });
    
    setShowModal(true);
  };

  const handleDownload = async () => {
    if (!couponRef.current) return;
    
    try {
      const canvas = await html2canvas(couponRef.current, {
        scale: 3, // High resolution
        useCORS: true,
        backgroundColor: null
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `MomCredit-${mothersName.replace(/\s+/g, '-')}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
    }
  };
  const allCoupons = [...coupons, {
    id: 'custom',
    title: customTitle,
    description: customDescription,
    style: { gradient: 'from-pink-400 to-rose-600', icon: '💝' },
    isCustom: true
  }];

  const selectedCoupon = allCoupons.find(c => c.id === selectedId);



  return (
    <div className="min-h-screen relative pb-32 pt-24 px-4 max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[55] glassmorphism bg-white/70 backdrop-blur-xl p-1.5 rounded-full shadow-lg border border-white flex items-center gap-1">
        <button 
          onClick={() => setCurrentView('app')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${currentView === 'app' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
          <Gift className="w-4 h-4" />
          Mom Credits
        </button>
        <button 
          onClick={() => setShowAboutModal(true)}
          className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 text-slate-500 hover:text-slate-800 hover:bg-slate-50`}
        >
          <Heart className="w-4 h-4" />
          About
        </button>
        <button 
          onClick={() => setCurrentView('roadmap')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${currentView === 'roadmap' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
          <Milestone className="w-4 h-4" />
          Roadmap
        </button>
      </div>

      {currentView === 'roadmap' ? (
        <Roadmap />
      ) : (
        <div className="animate-in fade-in duration-500">
          {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 text-pink-600 font-bold text-sm mb-6 shadow-sm">
          <Sparkles className="w-4 h-4" />
          Make Mother's Day Special
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-sunset-500 to-purple-600 mb-4 drop-shadow-sm">
          MomCredits
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Create a magical, personalized favor for your mom. Start by entering your names below, then pick a fabulous gift!
        </p>
      </div>

      {/* Personalization Section (Moved to Top) */}
      <div className="max-w-2xl mx-auto glassmorphism p-6 md:p-8 rounded-[2.5rem] mb-12 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-purple-500 to-gold-400" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Your Name Input */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="flex items-center gap-2 text-sm font-bold text-slate-600 mb-2 uppercase tracking-wider">
              <User className="w-4 h-4" /> Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all text-lg font-medium bg-white/70 shadow-inner"
            />
          </div>

          {/* Mother's Name Input */}
          <div className="flex flex-col">
            <label htmlFor="momName" className="flex items-center gap-2 text-sm font-bold text-slate-600 mb-2 uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-500" /> Your Mother's Name
            </label>
            <input
              id="momName"
              type="text"
              value={mothersName}
              onChange={(e) => setMothersName(e.target.value)}
              onFocus={() => {
                if (!mothersName.trim() && userName.trim()) {
                  setMothersName(`${userName.trim()}'s Mother`);
                }
              }}
              placeholder="Your Mother's Name"
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 outline-none transition-all text-lg font-medium bg-white/70 shadow-inner"
            />
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Select a Magical Favor</h2>
        <p className="text-slate-500 text-sm mt-1">Tap a card below to select your MomCredit.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mb-16">
        {allCoupons.map((coupon) => (
          <div 
            key={coupon.id}
            onClick={() => setSelectedId(coupon.id)}
            className={`
              relative p-5 sm:p-6 rounded-[1.5rem] cursor-pointer transition-all duration-300 transform hover:-translate-y-1
              glassmorphism overflow-hidden group flex flex-col
              ${selectedId === coupon.id ? 'ring-4 ring-gold-400 shadow-2xl scale-[1.02] bg-white/80' : 'hover:shadow-xl hover:bg-white/60'}
            `}
          >
            {/* Background Gradient Hint */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${coupon.style.gradient} rounded-full blur-3xl opacity-20 -mr-8 -mt-8 group-hover:opacity-40 transition-opacity duration-500`} />
            
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300 origin-center">
                {coupon.style.icon}
              </div>
              
              <div className="flex-1">
                {coupon.isCustom ? (
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xl sm:text-2xl font-bold text-slate-800 bg-transparent border-b-2 border-slate-200 focus:border-rose-500 outline-none w-full placeholder-slate-400 transition-colors leading-tight"
                    placeholder="Enter Title..."
                  />
                ) : (
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{coupon.title}</h3>
                )}
              </div>
            </div>

            {coupon.isCustom ? (
              <div className="relative z-10">
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={() => {
                    if (customDescription === 'Describe your special favor here...') {
                      setCustomDescription('');
                    }
                  }}
                  onBlur={() => {
                    if (customDescription.trim() === '') {
                      setCustomDescription('Describe your special favor here...');
                    }
                  }}
                  className="text-slate-600 text-sm sm:text-base leading-relaxed bg-transparent border-b-2 border-slate-200 focus:border-rose-500 outline-none w-full resize-none transition-colors"
                  rows={2}
                />
              </div>
            ) : (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed relative z-10">{coupon.description}</p>
            )}
            
            {/* Selected Indicator */}
            {selectedId === coupon.id && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-400 to-amber-500 text-white rounded-full p-1.5 shadow-lg animate-bounce z-20">
                <Sparkles size={16} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Action Button (Pops up when a coupon is selected) */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${selectedId ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      >
        <div className="bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] py-4 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Selected Favor</p>
              <p className="text-slate-800 font-black truncate max-w-[200px] sm:max-w-[300px]">
                {selectedCoupon?.style.icon} {selectedCoupon?.title}
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`
                w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all duration-300
                ${!canGenerate 
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                  : 'bg-gradient-to-r from-rose-500 hover:from-rose-600 to-purple-600 hover:to-purple-700 shadow-xl shadow-rose-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40'}
              `}
            >
              <Sparkles className="w-5 h-5" />
              {canGenerate ? 'Generate Magic Coupon' : 'Enter Names to Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Final Coupon */}
      {showModal && selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
          <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
            {/* Close button outside coupon to avoid capture */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute -top-14 right-0 p-3 text-white hover:text-rose-300 transition-colors bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            {/* The Coupon Card to Capture */}
            <div 
              ref={couponRef}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* Decorative top gradient border */}
              <div className={`absolute top-0 left-0 w-full h-4 bg-gradient-to-r ${selectedCoupon.style.gradient}`} />
              
              {/* Top corners decoration */}
              <div className={`absolute top-4 left-4 w-16 h-16 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${selectedCoupon.style.gradient}`} />
              <div className={`absolute bottom-4 right-4 w-24 h-24 rounded-full blur-2xl opacity-20 bg-gradient-to-tl ${selectedCoupon.style.gradient}`} />
              
              <div className="text-7xl mb-8 mt-4 relative z-10 filter drop-shadow-md">
                {selectedCoupon.style.icon}
              </div>
              
              <div className="mb-8 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black tracking-widest uppercase mb-4">
                  Official MomCredit
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
                  {selectedCoupon.title}
                </h2>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 p-6 rounded-3xl mb-10 shadow-sm relative z-10">
                <p className="text-slate-700 text-lg font-medium italic leading-relaxed">
                  "{selectedCoupon.description}"
                </p>
              </div>
              
              <div className="border-t-2 border-dashed border-slate-200 pt-8 relative z-10">
                <p className="text-slate-500 text-sm mb-2 font-medium uppercase tracking-wider">Granted With Love To</p>
                <p className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 pb-2">
                  {mothersName}
                </p>
                <p className="text-slate-400 text-sm mt-1">From: <span className="font-semibold text-slate-600">{userName}</span></p>
              </div>
              
              {/* Watermark */}
              <div className="mt-8 flex items-center justify-center gap-2 opacity-50 relative z-10">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                  Valid Forever • MomCredits
                </p>
                <Sparkles className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full mt-6 py-5 rounded-2xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
            >
              <Download className="w-6 h-6" />
              Download & Share
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg p-[3px] rounded-[2.5rem] bg-gradient-to-br from-rose-400 via-pink-400 to-sunset-400 animate-in zoom-in-75 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_20px_60px_-15px_rgba(244,63,94,0.5)]">
            <div className="glassmorphism bg-white/85 p-8 sm:p-10 rounded-[calc(2.5rem-3px)] relative overflow-hidden h-full">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowAboutModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 transition-all duration-300 hover:rotate-90 hover:bg-rose-50 rounded-full z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Illustration */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center shadow-inner border border-white">
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 leading-tight">
                  Because 'Nothing' is Everything.
                </h2>
                <p className="text-lg text-rose-500 font-bold mb-8 italic">
                  Small gestures for the heart that gives it all.
                </p>
                
                <div className="text-slate-700 text-[1.05rem] leading-relaxed text-left space-y-5 mb-10 font-medium">
                  <p>
                    When you ask a Mom what she wants, the answer is often 'nothing.' But we know that 'nothing' actually means a moment of peace, a helping hand, or a simple 'I’ve got this.'
                  </p>
                  <p>
                    <span className="font-bold text-slate-900">MomCredits</span> was built on the belief that love isn't measured by a price tag, but by the time we give back. Whether you’re five or fifty, these digital coupons represent a promise—a commitment to show up in the small ways that matter most.
                  </p>
                  <p>
                    No stores, no shipping, just pure intention. Because for the person who has given us everything, a small gesture is the greatest gift of all.
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 via-sunset-500 to-purple-500 text-white font-bold text-xl hover:shadow-lg hover:shadow-rose-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                  Got it, let's gift!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default App;
