import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"

import EventAdded from "./popups/EventAdded"
import AddEvent from "./AddEvent"

const Calendar = (props)=>{

const {userId} = useParams()

const[calendarDays, setCalndarDays] = useState([])
const[addEventState, setAddEventState] = useState(false)
const[date, setDate] = useState("")

const[calendarData, setCalendarData] = useState()
const[reRender, setReRender] = useState(0)

const[eventPopUp, setEventPopUp] = useState(false)

useEffect(()=>{

    fetch(`/events/${userId}`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        setCalendarData(data)
        reRender.length > 2 ? updateCalendar(data) : console.log("")
    })

},[reRender])

    /* Updates state when some data is added, edited or deleted so it can be rerenderd to page */
    function render(){
        setReRender(prevReRender => prevReRender + 1)
    }

function updateCalendar(data){
    setCalndarDays(prev=>{
        prev.map(day=>{
            const filteredData = data.filter(dataDay=> dataDay.date === day.date)
            return{...day, [day.data] : filteredData}
        })
    })
}

function calendar(event){
    const days = event.target.value
    const month = event.target.id
 
    calendarDays.length > 0 ? setCalndarDays([]) : setCalndarDays([])

    for(let i=1; i <= days; i++){
        let d= new Date(`${month} ${i}, 2022 01:15:00`)
        let db = `${month} ${i}, 2022`
        let getDaya = d.getDay()

        //check if getDay is 0
        // if not add add empty divs until is 0
        // bacicaly it adds empty divs 
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

        const findData = calendarData.filter(data=>{return data.date === db})
        let date = {
                id:i,
                day:getDaya,
                date:db,
                data:findData
            }
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

    return(
        <div key={day.id}>

            <div>{day.date}</div>
            {day.date !==""?
            <div>
                {/* Kad napravim da pulla evente iz DB napraviti logiku da prikazuje odnosno ne prikazuje */}
            <div>

                {
                    day.data.map(data=>{
                        return(
                            <p key="data.id">{data.title}</p>
                        )
                    })
                }

            </div>
            <button type="button" id={index} onClick={toggleAddEvent}>Add Event</button>
            
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
                eventPopUp={eventPopUp}
                setEventPopUp={setEventPopUp}
                render={render}
             />}
             {eventPopUp && 
             <EventAdded 
             eventPopUp={eventPopUp}
             setEventPopUp={setEventPopUp}
             />}
        </div>
    )
}

export default Calendar