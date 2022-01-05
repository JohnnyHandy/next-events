import { useRef } from 'react'

import Button from '../ui/button'
import classes from './events-search.module.css'

function EventsSearch(props: {
  onSearch: (year: string, month: string) => void
}) {
  const { onSearch } = props

  const yearInputRef = useRef<HTMLSelectElement>(null)
  const monthInputRef = useRef<HTMLSelectElement>(null)

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let selectedYear = ''
    let selectedMonth = ''
    selectedYear = yearInputRef.current?.value as string
    selectedMonth = monthInputRef.current?.value as string
    onSearch(selectedYear, selectedMonth)
  }

  return (
    <form
      className={classes.form}
      data-testid="events-search-form"
      onSubmit={submitHandler}
    >
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select data-testid="year-select" ref={yearInputRef} id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select data-testid="month-select" ref={monthInputRef} id="month">
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Set</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  )
}

export default EventsSearch
