import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "../ui/button";

interface FilterItemProps {
  children: ReactNode,
  title: string
}

export const FilterItem = ({ children, title }: FilterItemProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="border-b-1 w-80 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-base">{title}</h1>
        <Button size='icon' onClick={() => setShow(!show)} variant='ghost'>
          {show ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      <div className={`w-full flex flex-col gap-2 ${show ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}