import Link from "next/link";
import Image from "next/image";

export default function MyLogo() {
  return (
    <Link href="/">
      <Image
        src="/logo.jpg"
        alt="Weather Logo"
        width={45}
        height={45}
        priority
        className="object-contain w-auto h-auto rounded-full"
      />
    </Link>
  );
}
