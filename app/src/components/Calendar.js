import { useState } from "react"

const Calendar = ()=>{

const[calendarDays, setCalndarDays] = useState([])

function calendar(event){
    const days = event.target.value
    for(let i=0; i <= days; i++){
        setCalndarDays(prevCalendarDays=>{
            return[...prevCalendarDays, i]
        })
    }
}

const createCalendar = calendarDays.map(day=>{
    return(
        <div key={day}>{day}</div>
    )
})




    
    return(
        <div>
            <input type="radio" value="31" name="month" onClick={calendar}/> Jan
            <input type="radio" value="28" name="month" onClick={calendar}/> Feb  
            <input type="radio" value="31" name="month" onClick={calendar}/> Mar
            <input type="radio" value="30" name="month" onClick={calendar}/> Apr



            <div>
                {createCalendar}
            </div>
        </div>
    )
}

export default Calendar