import Link from "next/link";
import Image from 'next/image'

export default function MyLogo() {
  return (
    <Link
      href={"/"}
    >
      <Image
        src="/logo.png"
        alt="Weather Logo"
        width={60}
        height={60}
        loading="eager"
        priority
        className="h-auto w-auto"
      />
    </Link>
  )
}
