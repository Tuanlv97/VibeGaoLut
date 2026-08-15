'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Send, X, Sparkles, RefreshCw, ShoppingBag, BookOpen, ChevronRight, Check, Volume2, VolumeX } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';
import { useCartStore } from '@/stores/cart-store';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  suggestedPrompts?: string[];
  recommendedProducts?: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    imageUrl?: string;
    origin?: string;
  }>;
  recommendedBlogPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    readingTimeMinutes: number;
    coverImage?: string;
  }>;
  timestamp: Date;
}

export const VectorAIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const addItemToCart = useCartStore((state) => state.addItem);

  const initialBotMessage: ChatMessage = {
    id: 'welcome-msg',
    sender: 'bot',
    text: 'Dạ GreenPantry xin chào bạn! 🌿 Mình là AI Assistant tư vấn dinh dưỡng dưỡng sinh & thực phẩm mộc. Bạn cần mình tư vấn về sản phẩm hay thực đơn nào ạ? 😊',
    suggestedPrompts: [
      '🥗 Muốn ăn giảm cân thì ăn những thứ gì?',
      '🌾 Tác dụng gạo lứt đỏ ST25?',
      '🍵 Công dụng trà đậu đen gạo lứt?',
      '🚚 Chính sách giao hàng COD?',
    ],
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const chatThreadRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatThreadRef.current) {
      chatThreadRef.current.scrollTop = chatThreadRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // Stop audio on unmount or clear
  const stopAllAudio = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  };

  // Dual-Engine Vietnamese Voice Audio Speech Player
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      stopAllAudio();
      return;
    }

    stopAllAudio();

    // Clean Markdown tags & emojis for natural speech
    const cleanText = text
      .replace(/[*_#🌿🥣🍵🌾😊]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const shortText = cleanText.substring(0, 250); // Cut to 250 chars for fast audio response

    // Primary Engine: High Quality Google Vietnamese TTS Audio Stream
    try {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(shortText)}&tl=vi&client=tw-ob`;
      const audio = new Audio(googleTtsUrl);
      activeAudioRef.current = audio;
      setSpeakingMsgId(msgId);

      audio.onended = () => {
        setSpeakingMsgId(null);
        activeAudioRef.current = null;
      };

      audio.onerror = () => {
        // Fallback Engine: Web SpeechSynthesis with explicitly filtered Vietnamese voices
        activeAudioRef.current = null;
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(shortText);
          utterance.lang = 'vi-VN';
          utterance.rate = 0.95;

          const voices = window.speechSynthesis.getVoices();
          const viVoice = voices.find(
            (v) =>
              v.lang.toLowerCase().includes('vi') ||
              v.name.toLowerCase().includes('vietnam') ||
              v.name.toLowerCase().includes('tiếng việt') ||
              v.name.toLowerCase().includes('an') ||
              v.name.toLowerCase().includes('hoai')
          );
          if (viVoice) utterance.voice = viVoice;

          utterance.onend = () => setSpeakingMsgId(null);
          utterance.onerror = () => setSpeakingMsgId(null);

          window.speechSynthesis.speak(utterance);
        } else {
          setSpeakingMsgId(null);
        }
      };

      audio.play().catch(() => {
        // Handle autoplay policy block or fallback
        audio.onerror?.(new Event('error'));
      });
    } catch {
      setSpeakingMsgId(null);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetchAPI<{
        reply: string;
        suggestedPrompts?: string[];
        recommendedProducts?: Array<any>;
        recommendedBlogPosts?: Array<any>;
      }>('/chatbot/query', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
      });

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        suggestedPrompts: response.suggestedPrompts,
        recommendedProducts: response.recommendedProducts,
        recommendedBlogPosts: response.recommendedBlogPosts,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Dạ GreenPantry xin lỗi bạn vì gián đoạn kết nối ngắn. Bạn có thể chọn các câu hỏi gợi ý bên dưới để tra cứu thông tin sản phẩm gạo lứt, yến mạch hay trà thảo mộc nhé! 😊',
        suggestedPrompts: [
          '🥗 Muốn ăn giảm cân thì ăn những thứ gì?',
          '🌾 Tác dụng gạo lứt đỏ ST25?',
        ],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    try {
      addItemToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
        weightUnit: '500g',
        image: product.imageUrl || '/images/products/gao-lut-st25.webp',
        slug: product.slug,
      });
      setAddedProductId(product.id);
      setTimeout(() => setAddedProductId(null), 2000);
    } catch (err: any) {
      alert(err.message || 'Lỗi thêm sản phẩm vào giỏ');
    }
  };

  const handleClearChat = () => {
    stopAllAudio();
    setMessages([initialBotMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-[#2D5A27] text-white shadow-soft-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-emerald-600/30"
          aria-label="Mở Chatbot AI Dinh Dưỡng"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 animate-ping" />
            <div className="w-8 h-8 rounded-full bg-emerald-700/80 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              AI Assistant
            </span>
            <span className="text-sm font-bold leading-tight">Hỏi AI Dinh Dưỡng</span>
          </div>
        </button>
      )}

      {/* 2. Chatbot Drawer Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[580px] max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#2D5A27] text-white px-4 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-800 border border-emerald-400/40 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5 font-display">
                  GreenPantry AI
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-emerald-200/90 font-light">Tư Vấn Viên Dinh Dưỡng Dưỡng Sinh</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-emerald-100">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-emerald-800/80 transition-colors"
                title="Làm mới trò chuyện"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-emerald-800/80 transition-colors"
                title="Đóng Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div
            ref={chatThreadRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F9F6F0]/60 text-slate-800 text-sm scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Bubble Text */}
                <div
                  className={`group relative max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-soft-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#2D5A27] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* NotebookLM Voice Audio Speech Button for Bot Messages */}
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleToggleSpeak(msg.id, msg.text)}
                      className="mt-2 flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-[#2D5A27] transition-colors"
                      title="Nghe giọng đọc Tiếng Việt chuẩn"
                    >
                      {speakingMsgId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                          <span className="text-amber-600 font-semibold">Dừng phát</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe đọc Tiếng Việt 🔊</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Embedded Product Cards (Vector RAG Match) */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2D5A27] flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      Sản phẩm gợi ý phù hợp:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-soft-sm flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-11 h-11 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200">
                              {prod.imageUrl ? (
                                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                              ) : (
                                <ShoppingBag className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/products/${prod.slug}`}
                                className="font-semibold text-xs text-slate-800 hover:text-[#2D5A27] truncate block"
                              >
                                {prod.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono font-bold text-xs text-[#2D5A27]">
                                  {Number(prod.price).toLocaleString('vi-VN')} đ
                                </span>
                                {prod.compareAtPrice && (
                                  <span className="text-[10px] text-slate-400 line-through font-mono">
                                    {Number(prod.compareAtPrice).toLocaleString('vi-VN')} đ
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(prod)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all flex-shrink-0 ${
                              addedProductId === prod.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#2D5A27] text-white hover:bg-emerald-800'
                            }`}
                          >
                            {addedProductId === prod.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã thêm</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Thêm giỏ</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Embedded Blog Article Cards */}
                {msg.recommendedBlogPosts && msg.recommendedBlogPosts.length > 0 && (
                  <div className="w-full mt-2 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Bài viết hướng dẫn chi tiết:
                    </p>
                    <div className="space-y-1.5">
                      {msg.recommendedBlogPosts.map((blog) => (
                        <Link
                          key={blog.id}
                          href={`/blog/${blog.slug}`}
                          className="group bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 flex items-center justify-between gap-2 hover:bg-amber-100/80 transition-colors"
                        >
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs text-amber-950 group-hover:text-[#2D5A27] truncate">
                              {blog.title}
                            </h4>
                            <span className="text-[10px] text-amber-700 font-light">
                              {blog.readingTimeMinutes} phút đọc • Dinh dưỡng dưỡng sinh
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Prompts (Chips) */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const cleanText = prompt.replace(/^[^a-zA-Z0-9àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]+/i, '').trim();
                          handleSendMessage(cleanText);
                        }}
                        className="text-left px-3 py-1.5 rounded-full bg-white border border-emerald-600/30 text-[#2D5A27] hover:bg-[#2D5A27] hover:text-white text-xs transition-all shadow-soft-sm font-medium"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 px-1 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-white px-4 py-3 rounded-2xl border border-slate-200 w-fit shadow-soft-sm">
                <Bot className="w-4 h-4 text-[#2D5A27] animate-bounce" />
                <span>GreenPantry AI đang chuẩn bị thông tin...</span>
              </div>
            )}
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi AI về gạo lứt, ngũ cốc, giao hàng..."
              className="flex-1 bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2D5A27] focus:bg-white transition-[#colors]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-[#2D5A27] hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-soft-sm transition-colors"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
