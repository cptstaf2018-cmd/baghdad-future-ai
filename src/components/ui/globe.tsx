import React from "react";

const stars = [
  { left: "-20px", top: "22px", animation: "twinkling 3s infinite" },
  { left: "-40px", top: "92px", animation: "twinkling-slow 2s infinite" },
  { left: "320px", top: "60px", animation: "twinkling-long 4s infinite" },
  { left: "214px", top: "292px", animation: "twinkling 3s infinite" },
  { left: "50px", top: "270px", animation: "twinkling-fast 1.5s infinite" },
  { left: "250px", top: "-44px", animation: "twinkling-long 4s infinite" },
  { left: "286px", top: "170px", animation: "twinkling-slow 2s infinite" },
];

const Globe: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div className="relative flex h-[250px] w-[250px] items-center justify-center">
        <div className="absolute inset-[-56px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-[-18px] rounded-full border border-cyan-200/10" />
        <div
          className="relative h-[250px] w-[250px] overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 38% 34%, rgba(103,232,249,.45) 0 8%, transparent 9%), radial-gradient(circle at 58% 58%, rgba(16,185,129,.42) 0 11%, transparent 12%), radial-gradient(circle at 42% 70%, rgba(37,99,235,.5) 0 10%, transparent 11%), url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg'), linear-gradient(135deg, #082f49, #020617 68%)",
            backgroundSize: "180px 180px, 220px 220px, 180px 180px, cover, cover",
            backgroundPosition: "left",
            animation: "earthRotate 30s linear infinite",
            backgroundBlendMode: "screen, soft-light, screen, normal, normal",
          }}
        >
          {stars.map((star) => (
            <div
              key={`${star.left}-${star.top}`}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{ left: star.left, top: star.top, animation: star.animation }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Globe;
