import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { filterSelectOptions } from "@/db/staticData";
import { selectedOptionsType } from "@/types/staticData";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function Filter({
  handleChange,
  handleCheckbox,
}: {
  handleChange: (newValue: selectedOptionsType) => void;
  handleCheckbox: (newValue: selectedOptionsType) => boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className=""  asChild>
        <Button
          variant="outline" 
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-32 justify-between text-black"
        >
          Filter
          <ChevronDown className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] bg-background text-black p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {filterSelectOptions.map((group, index) => (
              <div key={group.heading}>
                <CommandGroup heading={group.heading}>
                  {group.options.map((option) => {
                    const isChecked = handleCheckbox({ value: option, heading: group.heading });
                    return (
                    <CommandItem
                      className="hover:bg-gray-100 my-px flex flex-row gap-2 cursor-pointer"
                      key={option}
                      value={option}
                      onSelect={(value) => {
                        handleChange({ value: value, heading: group.heading });
                        setOpen(false);
                      }}
                    >
                      <Checkbox className="border-[#003145]" checked={isChecked} />
                      <label
                        htmlFor={option}
                        className={`text-sm  tex-[#666666] text leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                      >
                        <span className={`${isChecked ? "text-black" : "text-[#666666]"}`}>{option}</span>
                      </label>
                    </CommandItem>
                  )})}
                </CommandGroup>
                {index < filterSelectOptions.length - 1 && (
                  <CommandSeparator className="bg-slate-200 mx-3" />
                )}
              </div>
            ))}
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
