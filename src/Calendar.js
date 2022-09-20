import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import eventsData from './data.json'
import './App.css'
import TodoModal from './TodoModal'

export default class Calendar extends React.Component {
    // Create a reference
    calendarRef = React.createRef()

    constructor (props) {

        super(props)

        this.state = {
            modal: false,
            events: eventsData.map((data, key) => {
                return {
                    id: data.id,
                    title: data.title,
                    start: data.start,
                    end: data.end
                }
            })
        }
    }

    componentDidMount () {
        
    }

    click() {
        this.toggleModal()
    }

    handleEventClick = async (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {

            console.log(clickInfo.event._def.publicId)

            let arrEvents = this.state.events
            arrEvents = arrEvents.filter(l => l.id !== parseInt(clickInfo.event._def.publicId)) 
            this.setState({...this.state,
                events: arrEvents
            })
            
            clickInfo.event.remove()
        }
    }

    toggleModal = () => {

        this.setState({...this.state,
            modal: !this.state.modal
        })
    }

    modalSubmit = (data) => {

        this.toggleModal()

        const newtodos = [...this.state.events]
        const todo = {
            "id": Math.floor(Math.random() * 45),
            "title": data.title,
            "start": data.start,
            "end": data.end,
            "backgroundColor": "green",
            "borderColor": "green"
        }
        newtodos.push(todo)
        this.setState({
            events: newtodos
        })

    }

    render() {

        return (
            <div className='demo-app-main'>
                <FullCalendar
                    ref={this.calendarRef} // Here is the reference
                    plugins={[interactionPlugin, listPlugin]}
                    initialView="listWeek"
                    headerToolbar={{
                        left: 'prev,next today addEventButton',
                        center: 'title',
                        right: ''
                    }}
                    customButtons={{
                        addEventButton: {
                            text: 'To do',
                            click: this.click.bind(this)
                        }
                    }}
                    eventOrder="-allDay"
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    disableDragging={true}
                    aspectRatio={6}
                    contentHeight={'calc(91vh - 50px)'}
                    selectOverlap={false}
                    eventDisplay= 'block'  
                    events= {this.state.events}
                    eventClick={this.handleEventClick}
                />
    
                <TodoModal isOpen={this.state.modal} onCloseModal={this.toggleModal} onModalSubmit={this.modalSubmit} />

            </div>

        )
    }
}