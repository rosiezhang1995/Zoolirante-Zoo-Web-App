const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

// Load existing data
fetch(`/api/EventsAPI/${eventId}`)
    .then(res => res.json())
    .then(event => {
        document.getElementById('title').value = event.title;
        document.getElementById('description').value = event.description;
        document.getElementById('eventDate').value = event.eventDate.split('T')[0];
        document.getElementById('eventTime').value = event.eventTime.substring(0, 5);
        document.getElementById('eventImage').value = event.eventImage;
        document.getElementById('location').value = event.location;
    });

// Save edited data (to be modified)
//document.getElementById('eventForm').addEventListener('submit', e => {
//    e.preventDefault();

//    const payload = {
//        eventID: eventId,
//        title: document.getElementById('title').value,
//        description: document.getElementById('description').value,
//        eventDate: document.getElementById('eventDate').value,
//        eventTime: document.getElementById('eventTime').value + ':00',
//        eventImage: document.getElementById('eventImage').value,
//        location: document.getElementById('location').value
//    };

//    fetch(`/api/EventsAPI/${eventId}`, {
//        method: 'PUT',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(payload)
//    })
//        .then(res => res.json())
//        .then(() => alert('Event updated successfully!'));
//});