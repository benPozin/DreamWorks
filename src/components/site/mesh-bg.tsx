export function MeshBg({ variant = "default" }: { variant?: "default" | "vip" }) {
  if (variant === "vip") {
    return (
      <div className="mesh-bg" aria-hidden="true">
        <div style={{ width: 520, height: 520, top: "5%", left: "10%", background: "radial-gradient(circle, #D4A017 0%, transparent 65%)" }} />
        <div style={{ width: 460, height: 460, top: "30%", right: "5%", background: "radial-gradient(circle, #A16207 0%, transparent 60%)", animationDelay: "-8s" }} />
        <div style={{ width: 600, height: 600, bottom: "0%", left: "30%", background: "radial-gradient(circle, #1C1917 0%, transparent 70%)", animationDelay: "-14s" }} />
      </div>
    );
  }
  return (
    <div className="mesh-bg" aria-hidden="true">
      <div style={{ width: 540, height: 540, top: "-8%", left: "-8%", background: "radial-gradient(circle, #DDE9F8 0%, transparent 65%)" }} />
      <div style={{ width: 500, height: 500, top: "15%", right: "-10%", background: "radial-gradient(circle, #2D6FC9 0%, transparent 60%)", animationDelay: "-7s", opacity: 0.45 }} />
      <div style={{ width: 620, height: 620, bottom: "-20%", left: "25%", background: "radial-gradient(circle, #EEF4FC 0%, transparent 70%)", animationDelay: "-13s" }} />
    </div>
  );
}
