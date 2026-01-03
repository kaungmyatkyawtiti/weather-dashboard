import Link from "next/link";
import Image from "next/image";

export default function MyLogo() {
  return (
    <Link href="/" className="relative block h-15 w-25">
      <Image
        src="/logo.png"
        alt="Weather Logo"
        fill
        priority
        className="object-contain"
        sizes="auto"
      />
    </Link>
  );
}
