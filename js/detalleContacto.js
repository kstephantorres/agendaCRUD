const parametroURL = new URLSearchParams(window.location.search)

const idContacto = parametroURL.get('id')


const agenda = JSON.parse(localStorage.getItem('agendaKey'))|| []



