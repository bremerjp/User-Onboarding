import React, {
    useState, useEffect
} from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({
    values,
    errors,
    touched,
    status
}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [users, status]);

    return (
        <div className="form">
            <Form>
                <label>
                    Name:
          <Field type="text" name="name" placeholder="Enter your name" />
                </label>
                <ErrorMessage
                    name="name"
                    render={msg => <div className="error">{msg}</div>}
                />
                <label>
                    Email:
          <Field
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                    />
                </label>
                <ErrorMessage
                    name="email"
                    render={msg => <div className="error">{msg}</div>}
                />
                <label>
                    Password:
          <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </label>
                <ErrorMessage
                    name="password"
                    render={msg => <div className="error">{msg}</div>}
                />
                <label>
                    Accept Terms of Service:
          <Field type="checkbox" name="terms" className="check"/>
                </label>
                <ErrorMessage
                    name="account_type"
                    render={msg => <div className="error">{msg}</div>}
                />
                <button className="submit" type="submit">Submit</button>
            </Form>
            {users.map(user => {
                return (
                    <ul>
                        <li>
                            Name: {user.name}
                        </li>
                        <li>Email: {user.email}</li>
                        <li>Password: **{user.password}**</li>
                    </ul>
                );
            })}
        </div>
    );
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a Name"),
        email: Yup.string().required("Please enter an Email"),
        password: Yup.string().required("Please enter password"),
        terms: Yup.boolean()
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log(response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => console.log(error.response));
    }
})(OnboardingForm)

export default FormikForm;