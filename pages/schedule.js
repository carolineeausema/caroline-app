import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'CS 471 - Advanced Algorithms',
    start: new Date(2025, 0, 13, 9, 0),
    end: new Date(2025, 0, 13, 10, 15),
    days: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    title: 'MATH 450 - Linear Algebra and Optimization',
    start: new Date(2025, 0, 13, 11, 0),
    end: new Date(2025, 0, 13, 12, 15),
    days: ['Monday', 'Wednesday'],
  },
  {
    title: 'ENG 402 - Technical Writing for Engineers',
    start: new Date(2025, 0, 14, 10, 0),
    end: new Date(2025, 0, 14, 11, 15),
    days: ['Tuesday', 'Thursday'],
  },
  {
    title: 'PHYS 411 - Quantum Mechanics',
    start: new Date(2025, 0, 14, 13, 0),
    end: new Date(2025, 0, 14, 14, 15),
    days: ['Tuesday', 'Thursday'],
  },
  {
    title: 'HIST 490 - History of Technology',
    start: new Date(2025, 0, 13, 15, 0),
    end: new Date(2025, 0, 13, 16, 15),
    days: ['Monday', 'Wednesday', 'Friday'],
  },
];

const generateRecurringEvents = (events) => {
  const recurringEvents = [];
  events.forEach((event) => {
    event.days.forEach((day) => {
      const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);

      for (let week = 0; week < 16; week++) {
        const baseDate = new Date(2025, 0, 13);
        const eventDate = new Date(baseDate);

        eventDate.setDate(baseDate.getDate() + week * 7 + (dayIndex - baseDate.getDay()));

        recurringEvents.push({
          title: event.title,
          start: new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            event.start.getHours(),
            event.start.getMinutes()
          ),
          end: new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            event.end.getHours(),
            event.end.getMinutes()
          ),
        });
      }
    });
  });
  return recurringEvents;
};

const Schedule = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025');
  const recurringEvents = generateRecurringEvents(events);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: 'black', color: 'white', padding: '10px', position: 'relative' }}>
        <img
          src="/images/purdue-logo.png"
          alt="Purdue Logo"
          style={{ height: '40px', position: 'absolute', top: '10px', left: '10px' }}
        />
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>Purdue University</h1>
          <p style={{ margin: '0', fontSize: '14px' }}>Student: Caroline Ausema</p>
          <select
            value={selectedSemester}
            onChange={handleSemesterChange}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid white',
              padding: '5px',
              fontSize: '14px',
              marginTop: '5px',
            }}
          >
            <option value="Spring 2025">Spring 2025</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Summer 2024">Summer 2024</option>
          </select>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '10px',
              background: 'white',
              color: 'black',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
              borderRadius: '5px',
              zIndex: 10,
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
              <li style={{ margin: '10px 0' }}>
                <a href="#profile" style={{ textDecoration: 'none', color: 'black' }}>
                  Profile
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="#settings" style={{ textDecoration: 'none', color: 'black' }}>
                  Settings
                </a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="#logout" style={{ textDecoration: 'none', color: 'black' }}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Calendar */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Your Class Schedule ({selectedSemester})</h2>
        <Calendar
          localizer={localizer}
          events={recurringEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WORK_WEEK}
          views={['work_week', 'day']}
          defaultDate={new Date(2025, 0, 13)}
          style={{ height: 500, fontSize: '12px' }}
        />
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: 'black', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <a href="#about" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
            About Purdue
          </a>
          <a href="#admissions" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
            Admissions
          </a>
          <a href="#academics" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
            Academics
          </a>
          <a href="#campus-life" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
            Campus Life
          </a>
        </div>
        <p style={{ fontSize: '12px', color: '#777' }}>© 2025 Purdue University. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Schedule;
