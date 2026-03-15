// src/pages/Policy.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Policy() {
  const [activeTab, setActiveTab] = useState("terms"); // 'terms' or 'privacy'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation mimic */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm py-4 px-6 flex items-center gap-2">
        <Heart className="w-8 h-8 fill-current text-teal-600" />
        <span className="text-2xl font-extrabold text-teal-600">CareLink</span>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-6 text-slate-900">네이버 약관 및 개인정보 보호</h1>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 font-bold ${activeTab === "terms" ? "text-teal-600 border-b-4 border-teal-500" : "text-slate-600"}`}
          >
            이용약관
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 font-bold ${activeTab === "privacy" ? "text-teal-600 border-b-4 border-teal-500" : "text-slate-600"}`}
          >
            개인정보처리방침
          </button>
        </div>

        {/* Content */}
        {activeTab === "terms" ? (
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>여러분을 환영합니다.</p>
            <p>다양한 네이버 서비스를 즐겨보세요.</p>
            <p>회원으로 가입하시면 서비스를 보다 편리하게 이용할 수 있습니다.</p>
            <p>여러분이 제공한 콘텐츠를 소중히 다룹니다.</p>
            <p>타인의 권리를 존중해주세요.</p>
            <p>서비스 이용과 관련한 주의사항이 있습니다.</p>
          </div>
        ) : (
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>개인정보처리방침 내용이 여기에 들어갑니다.</p>
            <p>사용자의 개인정보 수집, 이용, 보관에 대한 안내를 제공합니다.</p>
            <p>서비스 이용 중 개인정보 보호 관련 권리와 의무를 설명합니다.</p>
          </div>
        )}
      </main>

      {/* Footer mimic */}
      <footer className="bg-white border-t border-orange-100 text-slate-800 py-8 mt-auto text-center text-sm font-medium">
        <p>© Copyright 2026 CareLink Healthcare - All Rights Reserved</p>
      </footer>
    </div>
  );
}