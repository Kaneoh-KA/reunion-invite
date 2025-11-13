import { ref, set, onValue } from "firebase/database";
import { db } from "./firebaseConfig";
import { useState, useEffect } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReunionInvite() {
  const restaurantCandidates = [
    { name: "구이가 수서역점", desc: "돼지고기 구이 전문점", link: "https://naver.me/FvEIFJWA" },
    { name: "치킨매니아 수서일원점", desc: "바삭한 치킨과 맥주 한잔", link: "https://map.naver.com/p/entry/place/1016143694?placePath=%2Fhome" },
    { name: "가장맛있는족발 수서역점", desc: "족발, 보쌈, 막국수 전문점", link: "https://map.naver.com/p/entry/place/32805694?placePath=%2Fhome" },
    { name: "삼청동샤브 수서역점", desc: "샤브샤브와 건강식 메뉴", link: "https://map.naver.com/p/entry/place/1592151877?placePath=%2Fhome" },
    { name: "수서동1번집 본점", desc: "술 땡기는 이자카야", link: "https://map.naver.com/p/entry/place/1743826102?placePath=%2Fhome" },
  ];

  const [votes, setVotes] = useState(Array(restaurantCandidates.length).fill(0));
  const [votedIndex, setVotedIndex] = useState(null);

  // ✅ 로컬 저장된 투표 기록 불러오기 + 실시간 데이터 리스너
  useEffect(() => {
    const savedVote = localStorage.getItem("votedRestaurant");
    if (savedVote !== null) {
      setVotedIndex(parseInt(savedVote));
    }

    const voteRef = ref(db, "votes");

    // 실시간 데이터 반영
    const unsubscribe = onValue(voteRef, (snapshot) => {
      if (snapshot.exists()) {
        setVotes(snapshot.val());
      } else {
        // 초기값이 없으면 0으로 채움
        setVotes(Array(restaurantCandidates.length).fill(0));
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ 투표하기 / 취소하기
  const handleVote = async (index) => {
    if (votedIndex !== null && votedIndex !== index) {
      alert("이미 다른 후보에 투표하셨습니다 🎄");
      return;
    }

    const voteRef = ref(db, "votes");
    const newVotes = [...votes];

    if (votedIndex === index) {
      // 취소
      newVotes[index] -= 1;
      localStorage.removeItem("votedRestaurant");
      setVotedIndex(null);
    } else {
      // 신규 투표
      newVotes[index] += 1;
      localStorage.setItem("votedRestaurant", index);
      setVotedIndex(index);
    }

    await set(voteRef, newVotes); // ✅ update → set 으로 교체
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 via-green-50 to-white flex flex-col items-center p-6 text-center relative overflow-hidden">
      {/* ❄️ 눈 내리는 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white opacity-80"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 1000], opacity: [1, 0.5, 0], x: [Math.random() * 200 - 100] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: i * 0.4 }}
            style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 18 + 10}px` }}
          >
            ❄️
          </motion.div>
        ))}
      </div>

      {/* 🎄 제목 */}
      <div className="flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-green-900 drop-shadow-lg leading-snug break-keep"
        >
          🎄 2025 수서초등학교<br />
          <span className="inline-block pl-8">동창회 초대장 🎅</span>
        </motion.h1>
      </div>

      {/* 🎁 소개 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-8 max-w-md bg-white/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm border border-red-200"
      >
        <p className="text-lg mb-2 text-gray-800">🎁 수서동에서 다시 만나는 초딩들 💚</p>
        <div className="flex justify-center gap-3 text-green-800 mt-4">
          <div className="flex items-center gap-1"><MapPin size={18} /> 서울시 강남구 수서동</div>
        </div>
      </motion.div>

      {/* 🍽 식당 후보 투표 섹션 */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="text-2xl font-semibold mb-3 text-red-700 drop-shadow-sm"
      >
        🍽 식당 후보 투표 🎄
      </motion.h2>

      <div className="grid gap-4 max-w-md w-full">
        {restaurantCandidates.map((r, i) => (
          <div
            key={i}
            className={`shadow-md hover:shadow-2xl transition-all bg-white/90 p-4 rounded-xl ${votedIndex === i ? "border border-red-500" : ""}`}
          >
            <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2 text-green-900">
              {r.name}
              {votedIndex === i && <CheckCircle size={18} className="text-red-500" />}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{r.desc}</p>
            <div className="flex gap-2 justify-center">
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg py-2 font-medium transition-all"
              >
                위치 보기
              </a>
              <button
                onClick={() => handleVote(i)}
                className={`flex-1 rounded-lg py-2 font-medium text-white ${
                  votedIndex === i ? "bg-gray-400 hover:bg-gray-500" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {votedIndex === i ? "투표 취소" : "투표하기"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">현재 투표수: {votes[i]}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-gray-700">※ 투표는 한 번만 가능합니다 🎅</p>
      <p className="text-sm text-gray-700">※ 새로고침 시에도 유지됩니다 🎄</p>
    </div>
  );
}
