import { useState } from "react"


import AddEvent from "./AddEvent"

const Calendar = ()=>{

const[calendarDays, setCalndarDays] = useState([])
const[addEventState, setAddEventState] = useState(false)
const[date, setDate] = useState("")


function calendar(event){
    
    
    const days = event.target.value
    const month = event.target.id
 
    calendarDays.length > 0 ? setCalndarDays([]) : setCalndarDays([])

    
  
    for(let i=1; i <= days; i++){
        let d= new Date(`${month} ${i}, 2022 01:15:00`)
        let db = `${month} ${i}, 2022`
        let getDaya = d.getDay()

        //checl if getDay is 0
        // if not add add empty divs until is 0
        if(i === 1)
       { if(getDaya === 0){
            console.log('first day is Sunday')
        }else{
            for(let n = 0; n <= getDaya - 1;n++){
                setCalndarDays(prevCalendarDays=>{
                    return[...prevCalendarDays, {id: n + 100, day:"", date:""}]
                })
            }
        }}

        let date = {id:i,day:getDaya, date:db}
        setCalndarDays(prevCalendarDays=>{
            return[...prevCalendarDays, date]
        })
    }
    console.log(calendarDays)
    
}


function toggleAddEvent(event){
    const id = Number(event.target.id)
   
    const singleDay = calendarDays[id]
    
   
    addEventState? setDate(null):setDate(singleDay)

    setAddEventState(!addEventState)

    console.log(date)
    


}

const createCalendar = calendarDays?.map((day, index)=>{

    // console.log(day.date)
    return(
        <div key={day.id}>
            {/* <div>{day.day}</div> */}
            <div>{day.date}</div>
            {day.date !==""?
            <div>
                {/* Kad napravim da pulla evente iz DB napraviti logiku da prikazuje odnosno ne prikazuje */}
            <div>No Events</div>
            <button type="button" id={index} onClick={toggleAddEvent}>Add Event</button>
            <button type="button">See More</button>
            </div>
            :<div></div>}

        </div>
    )
})




    
    return(
        <div>
            <input type="radio" value="31" id="January" name="month" onClick={calendar}/> Jan
            <input type="radio" value="28" id="February"name="month" onClick={calendar}/> Feb  
            <input type="radio" value="31" id="March"name="month" onClick={calendar}/> Mar
            <input type="radio" value="30" id="April"name="month" onClick={calendar}/> Apr
            <input type="radio" value="31" id="May"name="month" onClick={calendar}/> Mai  
            <input type="radio" value="30" id="June"name="month" onClick={calendar}/> Jun
            <input type="radio" value="31" id="July"name="month" onClick={calendar}/> Jul
            <input type="radio" value="31" id="August"name="month" onClick={calendar}/> Aug  
            <input type="radio" value="30" id="September"name="month" onClick={calendar}/> Sep
            <input type="radio" value="31" id="October"name="month" onClick={calendar}/> Oct
            <input type="radio" value="30" id="November"name="month" onClick={calendar}/> Nov
            <input type="radio" value="31" id="December"name="month" onClick={calendar}/> Dec



            <div className="testing">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Thusday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Firday</div>
                <div>Saturday</div>
                {createCalendar}
            </div>

            {addEventState &&
             <AddEvent 
                toggleAddEvent={toggleAddEvent}
                date={date.date}
             />}
        </div>
    )
}

export default Calendar