import React from 'react'

export class NotesList extends React.Component{

    static defaultProps = {
        notes: [],
        selected: {
            id:'',
            title: '',
            text: ''
        }
    }

    render(){
        return (
          <div className="list-group">
            {this.props.notes.map((note) => (
              <div
                key={note.id}
                className={`list-group-item ${ this.props.selected.id === note.id ? 'active' : ""}`}
                onClick={this.props.onSelect}
                id={note.id}
                name={note.name}
                text={note.text ? note.text : note.title}
                title={note.title}
              >
                {note.title}
              </div>
            ))}
          </div>
        );
    }
}
