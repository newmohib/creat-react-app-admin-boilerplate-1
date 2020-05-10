import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { TextInput } from '../../Form';
import { formFieldName } from './signinForm';
import { handleSigninChange, handleSigninSubmit } from './action';

let Signin = (props) => {
    let errorValue = { email: "", password: "" };
    let formValue = props.signinInfo;
    let handleChange = ({ currentTarget: input }) => {
        let formValue = props.signinInfo;

        let signinInfo = { ...formValue, [input.name]: input.value };
        props.handleSigninChange(signinInfo);
    };

    const handleSubmit = (element) => {
        element.preventDefault();
        let signinSubmitArr = element.target;
        let signinObj = {};
        for (let i = 0; i < signinSubmitArr.length; i++) {
            const value = signinSubmitArr[i].value;
            const name = signinSubmitArr[i].name;
            if (name !== "") { signinObj[name] = value; }
        };
        props.handleSigninSubmit(signinObj);
    }
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    }
    
    //console.log("env", process.env.REACT_APP_BASE_URL);
    const githubPath= process.env.REACT_APP_GITHUB_PATH;
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-8 col-xl-6 col-lg-6 col-sm-10">
                <div className="container custom_form mt-5">
                    <div className="row mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <div className="container">
                                <div className="row mt-n2 mb-2 ml-n4 mr-n4">
                                    <div className="col-12 ">
                                        <div className="btn-group btn-block btn-group-lg mx-auto " role="group" aria-label="Basic example">
                                            <button onClick={() => routChange(`/${githubPath}`)} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign In</button>
                                            <button onClick={() => routChange(`/${githubPath}/authe/signup`)} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mx-2 justify-content-center font-weight-bold h3">Sign In</div>
                                    <div className="row mx-2">
                                        {
                                            formFieldName.map((item, itemIndex) => {
                                                return <TextInput
                                                    key={itemIndex}
                                                    {...item}
                                                    value={formValue[item.valueName]}
                                                    error={errorValue[item.errorName]}
                                                    onChange={handleChange}
                                                />
                                            })
                                        }
                                    </div>
                                    <div className="row mx-2 ">
                                        <div className="col-auto mr-auto float-left">
                                            <div>
                                                <button onClick={() => routChange("/authe/signup")} className="btn btn-light "><span className="">Forgot Password</span></button>
                                            </div>
                                        </div>
                                        <div className="col-auto float-right">
                                            <button type="submit" className="btn btn-primary btn-lg ">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
const mapStateToProps = state => ({
    signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
