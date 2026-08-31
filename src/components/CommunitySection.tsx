import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageSquare, Flame, Trophy, Send, Award, CheckCircle2 } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const { user, openAuthModal, communityPosts, leaderboard, addCommunityPost, toggleLikeCommunityPost } = useApp();
  const [newCheckinText, setNewCheckinText] = useState('');

  const handlePostCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      return;
    }
    if (!newCheckinText.trim()) return;

    addCommunityPost(newCheckinText);
    setNewCheckinText('');
  };

  return (
    <div id="community-tribe-page" className="min-h-screen bg-[#08080a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#FFC515]"></span>
              <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#FFC515]">
                COMMUNITY NETWORK // 11
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-display">
              THE <span className="text-[#FFC515]">TRIBE.</span>
            </h1>
            <p className="text-white/70 text-sm max-w-2xl mt-2 font-mono-num">
              Transformation is easier when you're not doing it alone. Share daily workout streaks, celebrate milestone PRs, and climb the discipline leaderboard alongside dedicated athletes worldwide.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Social Feed (Left 8 cols) vs Leaderboard (Right 4 cols) */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left: Feed & Post Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Post Check-In Form */}
            <form 
              onSubmit={handlePostCheckin}
              className="bg-[#101014] border border-white/10 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono-num font-bold uppercase text-[#FFC515] flex items-center gap-2">
                  <Flame size={14} /> LOG TODAY'S TRIBE CHECK-IN
                </span>
                <span className="text-[10px] font-mono-num text-white/40">
                  {user ? `POSTING AS ${user.name.toUpperCase()}` : 'SIGN IN TO POST'}
                </span>
              </div>

              <textarea
                value={newCheckinText}
                onChange={(e) => setNewCheckinText(e.target.value)}
                placeholder="Declare your daily victory: What lift did you hit? Did you hit your exact protein target?"
                rows={3}
                className="w-full bg-[#14141a] border border-white/10 p-3 text-xs font-mono-num text-white placeholder-white/20 focus:border-[#FFC515] focus:outline-none"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono-num text-white/40">
                  Visible to all active challenge athletes
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFC515] hover:bg-[#E6AF0F] text-black font-mono-num font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 self-end sm:self-auto shrink-0 transition-colors shadow-[0_0_15px_rgba(255,197,21,0.25)]"
                >
                  <Send size={13} />
                  <span>PUBLISH CHECK-IN</span>
                </button>
              </div>
            </form>

            {/* Posts Stream */}
            <div className="space-y-4">
              {communityPosts.map(post => {
                return (
                  <div 
                    key={post.id}
                    className="bg-[#101014] border border-white/10 p-6 space-y-4 hover:border-white/20 transition-all"
                  >
                    {/* Author Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-10 h-10 object-cover filter grayscale contrast-125 border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold font-mono-num text-white">
                              {post.authorName}
                            </span>
                            {post.streakCount !== undefined && (
                              <span className="px-2 py-0.5 bg-[#14141a] border border-white/10 text-[10px] font-mono-num text-[#FFC515] font-bold">
                                {post.streakCount}D STREAK
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono-num text-white/40">
                            {post.authorHandle} • {post.timeAgo}
                          </span>
                        </div>
                      </div>

                      {post.badge && (
                        <span className="text-[10px] font-mono-num px-2 py-0.5 bg-[#14141a] border border-white/10 text-white/80 uppercase">
                          {post.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm font-mono-num text-white/80 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Image if present */}
                    {post.imageUrl && (
                      <div className="h-64 w-full bg-[#14141a] overflow-hidden border border-white/10">
                        <img
                          src={post.imageUrl}
                          alt="Athlete check in"
                          className="w-full h-full object-cover filter grayscale contrast-125"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-6 pt-3 border-t border-white/5 font-mono-num text-xs text-white/60">
                      <button
                        onClick={() => toggleLikeCommunityPost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.hasLiked ? 'text-[#FFC515]' : 'hover:text-white'
                        }`}
                      >
                        <Heart size={14} className={post.hasLiked ? 'fill-[#FFC515]' : ''} />
                        <span className={post.hasLiked ? 'font-bold text-[#FFC515]' : ''}>{post.likesCount} RESPECTS</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Leaderboard & Consistency Standings */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#101014] border border-white/10 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFC515] font-bold block">
                    GLOBAL ATHLETE STANDINGS
                  </span>
                  <h3 className="text-xl font-bold uppercase font-display text-white mt-0.5">
                    STREAK LEADERBOARD
                  </h3>
                </div>
                <Trophy size={18} className="text-[#FFC515]" />
              </div>

              {/* Leaderboard List */}
              <div className="space-y-3 font-mono-num text-xs">
                {leaderboard.map(userItem => (
                  <div
                    key={userItem.rank}
                    className={`p-3 border flex items-center justify-between ${
                      userItem.rank === 1 
                        ? 'border-[#FFC515]/60 bg-[#FFC515]/5' 
                        : userItem.isCurrentUser
                        ? 'border-white/30 bg-[#14141a]'
                        : 'border-white/5 bg-[#101014]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-extrabold text-sm w-5 text-center ${
                        userItem.rank === 1 ? 'text-[#FFC515]' : 'text-white/40'
                      }`}>
                        #{userItem.rank}
                      </span>
                      <img
                        src={userItem.avatar}
                        alt={userItem.name}
                        className="w-8 h-8 object-cover filter grayscale border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-white font-bold block">{userItem.name}</span>
                        <span className="text-[10px] text-white/40">{userItem.challengeProgress}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-[#FFC515] block">
                        {userItem.streakDays}D
                      </span>
                      <span className="text-[9px] text-white/40 uppercase">{userItem.totalWorkouts} SESSIONS</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 text-[11px] font-mono-num text-white/40 text-center">
                Leaderboard resets monthly. Rankings are determined by verified logs and unbroken streaks.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
