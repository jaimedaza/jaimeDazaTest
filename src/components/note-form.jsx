import React from 'react'

export class NoteForm extends React.Component{

    constructor(props){
        super(props)
    }

    static defaultProps = {
        note: {
            title:'',
            text:''
        }
    }

    render(){
        return (
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                name="title"
                value={this.props.note.title}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Note:</label>
              <textarea
                className="form-control"
                name="text"
                value={this.props.note.text}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <input
                id="cancel-note"
                type="button"
                className="btn btn-default pull-right"
                value="Cancel"
                onClick={this.props.onCancel}
              />
              <input
                id="save-note"
                type="submit"
                className="btn btn-default pull-right"
                value="Save"
              />
            </div>
          </form>
        );
    }
}
