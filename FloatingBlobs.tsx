import { memo } from "react";

const FloatingBlobs = memo(function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Blue */}
      <div
        className="floating-blob w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
        style={{
          background: "radial-gradient(circle, rgba(79,140,255,0.4) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animation: "blobFloat1 20s ease-in-out infinite",
        }}
      />
      {/* Blob 2 - Purple */}
      <div
        className="floating-blob w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          top: "40%",
          right: "-15%",
          animation: "blobFloat2 18s ease-in-out infinite",
        }}
      />
      {/* Blob 3 - Pink */}
      <div
        className="floating-blob w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
          bottom: "-5%",
          left: "20%",
          animation: "blobFloat3 22s ease-in-out infinite",
        }}
      />
      {/* Blob 4 - Light Blue */}
      <div
        className="floating-blob w-[250px] h-[250px] md:w-[350px] md:h-[350px]"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)",
          top: "20%",
          right: "30%",
          animation: "blobFloat1 25s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
});

export default FloatingBlobs;
