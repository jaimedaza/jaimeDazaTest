import React from 'react'

import { NotesList } from './notes-list'
import { NoteForm } from './note-form'

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);

    this.newNote = this.newNote.bind(this);

    this.onCancel = this.onCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    // Notes Service Object
    this.service = this.props.service;

    this.state = {
      notes: [],
      selected: {
        id: "",
        title: "",
        text: "",
      },
      formDisplay: false,
    };
  }

  // (!) Get notes from service
  async getNotesFromService() {
    let serviceNotes = await this.service.getNotes();
    this.setState({ notes: serviceNotes });
  }

  // Select new empty note
  newNote() {
    this.setState({formDisplay: true});
  }

  // Set note as selected
  onSelect(note) {
    this.setState({
      selected: {
        title: note.target.title,
        text: note.target.text || note.target.title,
        id: note.target.id
      },
      formDisplay: true
    });
  }

  // Save note to service
  async onSubmit(note) {
    note.preventDefault()
    let savedNote = {title: this.state.selected.title, text: this.state.selected.text, id: this.state.selected.id}
    await this.service.saveNote(savedNote);
    let serviceNotes = await this.service.getNotes();
    this.setState({ notes: serviceNotes });
  }

  // Unselect note
  onCancel() {
    this.setState({
      selected: {
        title: '',
        text: '',
        id: ''
      },
      formDisplay: false
    })

  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      selected: {...this.state.selected, [event.target.name]: value}
    })
  }

  componentDidMount() {
    this.getNotesFromService();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>React notes</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <NotesList
              notes={this.state.notes}
              onSelect={this.onSelect}
              selected={this.state.selected}
            />
          </div>
          <div className="col-md-8">
            {this.state.formDisplay && (
                <NoteForm
                  note={this.state.selected}
                  onChange={this.handleChange}
                  onSubmit={this.onSubmit}
                  onCancel={this.onCancel}
                />
              )}
            {!this.state.selected.title && (
              <div id="new-note">
                <button onClick={this.newNote}>New Note</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
