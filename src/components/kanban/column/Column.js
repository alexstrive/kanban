import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditTitle from "./EditTitle";
import Cancel from "../Cancel/Cancel";
import './Column.css';

export default class Column extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        tasks: PropTypes.arrayOf(PropTypes.string),
        onRemove: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            editTitle: false
        };

        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.handleAddNewTitle = this.handleAddNewTitle.bind(this);
    }

    handleEditTitle() {
        this.setState(() => ({editTitle: true}))
    }

    handleAddNewTitle(title) {
        this.setState((prevState) => ({
            editTitle: false,
            title: title.length > 0 ? title : prevState.title
        }));
    }

    render() {
        return (
            <div className={`column`}>
                {this.state.editTitle ?
                <EditTitle
                    title={this.state.title}
                    onAddNewTitle={this.handleAddNewTitle}
                /> :
                <div className={`title-container`}>
                    <h2
                        onDoubleClick={this.handleEditTitle}
                        className={`title`}>
                        {this.state.title}
                    </h2>
                    <div className={`title-btnRemove`}>
                        <Cancel onClick={() => this.props.onRemove(this.props.id)}/>
                    </div>

                </div>
                }
            </div>
        );
    }
}