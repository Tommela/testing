import { useState, useEffect, useRef } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerView = 'day' | 'month' | 'year'

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_SHORT = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Format date to "Jan. 20, 2025" format
const formatDate = (date: Date): string => {
  const month = MONTHS_SHORT[date.getMonth()]
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

// Parse "Jan. 20, 2025" format to Date
const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null
  
  // Try to parse "Jan. 20, 2025" format
  const months: { [key: string]: number } = {
    'Jan.': 0, 'Feb.': 1, 'Mar.': 2, 'Apr.': 3,
    'May': 4, 'Jun.': 5, 'Jul.': 6, 'Aug.': 7,
    'Sep.': 8, 'Oct.': 9, 'Nov.': 10, 'Dec.': 11
  }
  
  const match = dateString.match(/(\w+\.?)\s+(\d+),\s+(\d+)/)
  if (match) {
    const [, monthStr, day, year] = match
    const month = months[monthStr] ?? 0
    return new Date(parseInt(year), month, parseInt(day))
  }
  
  // Try to parse YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString)
  }
  
  // Try standard date parsing
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

export function DatePicker({ value, onChange, placeholder = 'Select a date', disabled, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<DatePickerView>('day')
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const parsed = value ? parseDate(value) : null
    return parsed || new Date()
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    return value ? parseDate(value) : null
  })
  const [inputValue, setInputValue] = useState(() => {
    return value ? formatDate(parseDate(value) || new Date()) : ''
  })
  const [yearRange, setYearRange] = useState(() => {
    const year = currentDate.getFullYear()
    const startYear = Math.floor(year / 10) * 10 - 1
    return { start: startYear, end: startYear + 11 }
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const lastOnChangeValue = useRef<string>('')

  // Update selected date when value prop changes
  useEffect(() => {
    if (value) {
      const parsed = parseDate(value)
      if (parsed) {
        const formatted = formatDate(parsed)
        setSelectedDate(parsed)
        setCurrentDate(parsed)
        setInputValue(formatted)
        lastOnChangeValue.current = formatted
        // Update year range based on selected date
        const year = parsed.getFullYear()
        const startYear = Math.floor(year / 10) * 10 - 1
        setYearRange({ start: startYear, end: startYear + 11 })
      }
    } else {
      setSelectedDate(null)
      setInputValue('')
      lastOnChangeValue.current = ''
      // Default to today when opened
      const today = new Date()
      setCurrentDate(today)
      const year = today.getFullYear()
      const startYear = Math.floor(year / 10) * 10 - 1
      setYearRange({ start: startYear, end: startYear + 11 })
    }
  }, [value])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentDate(date)
    const formatted = formatDate(date)
    setInputValue(formatted)
    if (lastOnChangeValue.current !== formatted) {
      lastOnChangeValue.current = formatted
      onChange?.(formatted)
    }
    setOpen(false)
    setView('day')
  }

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(currentDate.getFullYear(), month, currentDate.getDate())
    setCurrentDate(newDate)
    setView('day')
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), currentDate.getDate())
    setCurrentDate(newDate)
    setView('month')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
  }
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const parsed = parseDate(inputValue)
      if (parsed) {
        const formatted = formatDate(parsed)
        setSelectedDate(parsed)
        setCurrentDate(parsed)
        setInputValue(formatted)
        if (lastOnChangeValue.current !== formatted) {
          lastOnChangeValue.current = formatted
          onChange?.(formatted)
        }
      }
    }
  }

  const handleInputBlur = () => {
    if (inputValue) {
      const parsed = parseDate(inputValue)
      if (parsed) {
        const formatted = formatDate(parsed)
        setSelectedDate(parsed)
        setCurrentDate(parsed)
        setInputValue(formatted)
        if (lastOnChangeValue.current !== formatted) {
          lastOnChangeValue.current = formatted
          onChange?.(formatted)
        }
      } else if (selectedDate) {
        // If parsing failed but we have a selected date, restore it
        const formatted = formatDate(selectedDate)
        setInputValue(formatted)
      } else {
        // Clear if invalid and no selected date
        setInputValue('')
      }
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateYearRange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setYearRange({ start: yearRange.start - 12, end: yearRange.end - 12 })
    } else {
      setYearRange({ start: yearRange.start + 12, end: yearRange.end + 12 })
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
    
    const days: (number | null)[] = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isWeekend = (dayIndex: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = new Date(year, month, dayIndex)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // Sunday or Saturday
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('relative', className)}>
          <Input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            className='w-full pr-10'
          />
          <Calendar className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='p-4'>
          {/* Day View */}
          {view === 'day' && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  className='h-7 px-3 font-semibold'
                  onClick={() => setView('month')}
                >
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
              <div className='grid grid-cols-7 gap-1'>
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className='text-center text-sm font-medium text-gray-500 w-10'>
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className='w-10 h-10' />
                  }
                  const dayIndex = day
                  return (
                    <Button
                      key={day}
                      variant='ghost'
                      className={cn(
                        'w-10 h-10 p-0 font-normal',
                        isSelected(dayIndex) && 'bg-black text-white rounded-full hover:bg-black',
                        !isSelected(dayIndex) && isToday(dayIndex) && 'bg-gray-100',
                        !isSelected(dayIndex) && !isToday(dayIndex) && 'hover:bg-gray-100',
                        isWeekend(dayIndex) && !isSelected(dayIndex) && 'text-red-400'
                      )}
                      onClick={() => {
                        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayIndex)
                        handleDateSelect(newDate)
                      }}
                    >
                      {day}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Month View */}
          {view === 'month' && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateYear('prev')}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  className='h-7 px-3 font-semibold'
                  onClick={() => setView('year')}
                >
                  {currentDate.getFullYear()}
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateYear('next')}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                {MONTHS.map((month, index) => (
                  <Button
                    key={month}
                    variant='ghost'
                    className={cn(
                      'h-10 px-3 font-normal',
                      currentDate.getMonth() === index && 'border-2 border-black font-semibold',
                      currentDate.getMonth() !== index && 'hover:bg-gray-100'
                    )}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Year View */}
          {view === 'year' && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateYearRange('prev')}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='ghost' className='h-7 px-3 font-semibold'>
                  {yearRange.start}-{yearRange.end}
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => navigateYearRange('next')}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
              <div className='grid grid-cols-4 gap-2'>
                {Array.from({ length: 12 }, (_, i) => {
                  const year = yearRange.start + i
                  return (
                    <Button
                      key={year}
                      variant='ghost'
                      className={cn(
                        'h-10 px-3 font-normal',
                        currentDate.getFullYear() === year && 'border-2 border-black font-semibold',
                        currentDate.getFullYear() !== year && 'hover:bg-gray-100'
                      )}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

