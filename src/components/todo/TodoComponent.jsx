import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import react, { Component } from 'react';
import TodoDataService from './TodoDataService';
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser();

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            username: username,
            isDone: false
        }

        console.log('create todo ' + username);
        console.log('create todo id ' + this.state.id);
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            console.log('else block');
            TodoDataService.updateTodo(username, this.state.id, todo).then(
                () => this.props.history.push('/todos')
            )

        }

    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }
            ))
    }

    render() {

        let targetDate = this.state.targetDate;
        let description = this.state.description;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="formGroup">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="formGroup">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
               Todo Component for id {this.props.match.params.id}
            </div>
        );
    }
}
export default TodoComponent