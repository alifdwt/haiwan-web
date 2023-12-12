import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search" />
      <Button type="submit">Search</Button>
    </div>
  );
}

const NavigationMenuBottom = () => {
  return (
    <div className="bg-secondaryDark w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <p className="self-center text-2xl font-extrabold whitespace-nowrap text-white">
          Happy New Year!
        </p>
        <InputWithButton />
      </div>
    </div>
  );
};

export default NavigationMenuBottom;
