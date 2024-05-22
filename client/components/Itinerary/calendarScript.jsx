import React, { useState, useEffect } from 'react';

// Use Material UI to style it like CSS
// Import makeStyles function from Material-UI
// import { makeStyles } from '@material-ui/core/styles'; 

// const useStyles = makeStyles((theme) => ({
//     calendar: {
//       fontFamily: 'Arial, sans-serif',
//       border: '1px solid #ccc',
//       borderRadius: '5px',
//       padding: '20px',
//       backgroundColor: '#fff',
//     },
//     month: {
//       textAlign: 'center',
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       marginBottom: '10px',
//     },
//     day: {
//       width: '40px',
//       height: '40px',
//       textAlign: 'center',
//       lineHeight: '40px',
//       border: '1px solid #ccc',
//       borderRadius: '50%',
//       cursor: 'pointer',
//       '&.other-month': {
//         color: '#ccc',
//       },
//       '&.today': {
//         backgroundColor: '#f0f0f0',
//       },
//     },
//     // Add more styles as needed
//   }));

const CalendarScript = () => {
    // Define state variables
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    // Adding event variable
    const [events, setEvents] = useState([]);

    // Function to add a new event
    const addEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    // Function to delete an event
    const deleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

     // Function to update an event
     const updateEvent = (updatedEvent) => {
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    // Define the months array
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Define event handlers
    const handleNextMonthClick = () => {
        setCurrentMonth(currentMonth + 1);
        if (currentMonth + 1 > 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        }
        renderCalendar();
    };

    const handlePrevMonthClick = () => {
        setCurrentMonth(currentMonth - 1);
        if (currentMonth - 1 < 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        }
        renderCalendar();
    };

    const handleTodayBtnClick = () => {
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
        renderCalendar();
    };

    // Function to render the calendar
    const renderCalendar = () => {
          // Get the first and last day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Initialize an array to hold the JSX elements for each day
    let days = [];

    // Loop through the days of the month
    for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
        // Determine if the current date is in the current month
        const isInCurrentMonth = date.getMonth() === currentMonth;

        // Highlight the current day
        const isCurrentDay = date.toDateString() === new Date().toDateString();

        // Add a CSS class for styling
        const classNames = ['day'];
        if (!isInCurrentMonth) classNames.push('other-month');
        if (isCurrentDay) classNames.push('current-day');

        // Push JSX element for the day to the days array
        days.push(
            <div className={classNames.join(' ')} key={date}>
                {date.getDate()}
            </div>
        );
    }

    // Return the JSX for the calendar grid
    return (
        <div className="calendar-grid">
            {days} 
        </div>
    );
    };

    // useEffect to call renderCalendar when currentMonth or currentYear changes
    useEffect(() => {
        renderCalendar();
    }, [currentMonth, currentYear]);


    // Placing event functionality here
    


    // Define a function to generate the JSX for the days of the month
const renderDaysOfMonth = () => {
    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create an array to store the JSX elements for the days
    const daysJSX = [];

    // Loop over the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = `${currentYear}-${currentMonth + 1}-${i}`;
        const event = events.find(event => event.date === day);
        const isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();

        const dayJSX = (
            <div className={`day ${isToday ? 'today' : ''}`} key={i}>
                {i}
                <form>
                    <label htmlFor={`event_${day}`}>Things to do:</label>
                    <input
                        type="text"
                        id={`event_${day}`}
                        name={`event_${day}`}
                        value={event ? event.description : ''}
                        onChange={(e) => updateEvent({ ...event, description: e.target.value })}
                    />
                    <button type="button" onClick={() => deleteEvent(event.id)}>Delete</button>
                </form>
            </div>
        );
        daysJSX.push(dayJSX);

    }

    // Return the array of JSX elements for the days
    return daysJSX;
};

    // Return JSX for the calendar component
    return (
        <div className="calendar">
        <div className="month">{months[currentMonth]} {currentYear}</div>
        <div className="days">{renderDaysOfMonth()}</div>
        <div className="buttons">
            <button className="prev-btn" onClick={handlePrevMonthClick}>
                <i className="fas fa-chevron-left">Prev</i>
            </button>
            <button className="next-btn" onClick={handleNextMonthClick}>
                <i className="fas fa-chevron-right">Next</i>
            </button>
            <button className="today-btn" onClick={handleTodayBtnClick}>
                <i className="fas fa-calendar-day">Current</i>
            </button>
        </div>
    </div>
    );
};

export default CalendarScript;

