import { useEffect, useState } from "react"
import { type DateRange } from "react-day-picker"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { FilterItem } from "./filter-item"

type TodoFilterValue = {
  range?: { from?: Date; to?: Date }
  status?: "completed" | "pending"
}

export const TodoFilter = ({
  onChange,
  onClear,
  onSubmit
}: {
  onChange: (filters: TodoFilterValue) => void
  onClear: () => void
  onSubmit: () => void
}) => {

  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  })
  const [status, setStatus] = useState<string>()

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return

    onChange({
      range: dateRange,
      status: status as "completed" | "pending" | undefined
    })
  }, [dateRange, status])

  const handleClear = () => {
    setDateRange(undefined)
    setStatus(undefined)
    onClear()
  }
  const handleSubmit = () => {
    setDateRange(undefined)
    setStatus(undefined)
    onSubmit()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Filter</h1>
      <div className="border-1 border-black rounded-sm shadow-md pb-2">
        <FilterItem title="Date">
          <div className="flex items-center justify-between mt-2">
            <Label htmlFor="date" className="px-1">
              Date Range
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal"
                >
                  {dateRange?.from && dateRange?.to ? `${dateRange.from?.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString()}` : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                />
              </PopoverContent>
            </Popover>
          </div>
        </FilterItem>
        <FilterItem title="Status">
          <RadioGroup onValueChange={setStatus} className="mt-2">
            <div className='flex items-center gap-3'>
              <RadioGroupItem value='completed' id='r1' />
              <Label className="cursor-pointer" htmlFor="r1">Completed</Label>
            </div>
            <div className='flex items-center gap-3'>
              <RadioGroupItem value='pending' id='r2' />
              <Label className="cursor-pointer" htmlFor="r2">Pending</Label>
            </div>
          </RadioGroup>
        </FilterItem>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleClear}>Clear filters</Button>
        <Button onClick={handleSubmit}>Filter</Button>
      </div>
    </div>
  )
}