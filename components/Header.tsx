import { ModeToggle } from "./ModeToggle";
import MyLogo from "./MyLogo";
import MyContainer from "./MyContainer";
import CitySearch from "./CitySearch";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border py-2 bg-background/70 backdrop-blur-md"
    >
      <MyContainer
        className="flex items-center justify-between text-foreground/80"
      >
        <MyLogo />
        <div className="flex items-center gap-6">
          <CitySearch />
          <ModeToggle />
        </div>
      </MyContainer>
    </header>
  )
}
