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

  // 🎵 크리스마스 배경음악 자동 재생
  useEffect(() => {
    const audio = new Audio("https://pixabay.com/sound-effects/sound-effect-jingle-bells-jingle-bells-music-box-269306/");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  // ✅ 투표 & 취소 기능
  const handleVote = (index) => {
    const newVotes = [...votes];

    if (votedIndex === index) {
      // 이미 눌렀던 후보 다시 누르면 투표 취소
      newVotes[index] -= 1;
      setVotes(newVotes);
      setVotedIndex(null);
    } else if (votedIndex === null) {
      // 아직 투표 안 한 경우
      newVotes[index] += 1;
      setVotes(newVotes);
      setVotedIndex(index);
    }
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

      {/* 🍽 식당 후보 목록 */}
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

      <p className="mt-10 text-sm text-gray-700">※ 다시 누르면 투표가 취소됩니다 🎅</p>
      <p className="text-sm text-gray-700">※ 참석 여부는 카카오톡으로 알려주세요 🎄</p>
    </div>
  );
}
