import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sortSelectOptions } from "@/db/staticData";
import { setSortOrder } from "@/redux/hackathonsSlice";
import { RootState } from "@/redux/store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function Sort() {
  const dispatch = useDispatch();
  const { sortOrder } = useSelector((state: RootState) => state.hackathons);
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="max-w-[90px] " asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-32 justify-between text-black"
        >
          Sort
          <ChevronDown className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] bg-background text-black p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {sortSelectOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => dispatch(setSortOrder(option))}
                >
                  <Checkbox className="border-[#003145]" checked={sortOrder === option} />
                  <label
                    htmlFor={option}
                    className={`text-sm  tex-[#666666] text leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                  >
                    <span
                      className={`${
                        sortOrder === option ? "text-black" : "text-[#666666]"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
