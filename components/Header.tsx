import { ModeToggle } from "./ModeToggle";
import MyLogo from "./MyLogo";
import MyContainer from "./MyContainer";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border py-3 bg-background/80"
    >
      <MyContainer
        className="flex items-center justify-between text-foreground/80"
      >
        <MyLogo />
        <ModeToggle />
      </MyContainer>
    </header>
  )
}
