import { Link } from "react-router-dom";

import loginLogo from "@/assets/logo/Logo_Black_Colored_Large.png";
import headerLogo from "@/assets/logo/Logo_Black_Colored_Small.png";

type LogoVariant = "login" | "header";

interface LogoProps {
  /** 로그인 페이지용인지, 일반 페이지(헤더/사이드바)용인지 */
  variant?: LogoVariant;
  /** 클릭 시 이동할 경로 (없으면 a 태그 없이 이미지만 렌더링) */
  to?: string;
  /** 추가로 Tailwind className 전달하고 싶을 때 */
  className?: string;
}

/**
 * Record 공통 로고 컴포넌트
 * - variant="login"  : 로그인 화면 상단 큰 로고
 * - variant="header" : 일반 페이지 헤더/사이드바에서 쓰는 작은 로고
 */
export default function Logo({
  variant = "header",
  to,
  className = "",
}: LogoProps) {
  const src = variant === "login" ? loginLogo : headerLogo;

  // 로그인용은 조금 더 크게, 헤더용은 작게
  const baseSizeClass =
    variant === "login"
      ? "h-14 md:h-16" // 예: 56~64px 높이
      : "h-10"; // 예: 40px 높이

  const img = (
    <img
      src={src}
      alt="Record Admin"
      className={`${baseSizeClass} w-auto ${className}`}
    />
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center">
        {img}
      </Link>
    );
  }

  return img;
}
