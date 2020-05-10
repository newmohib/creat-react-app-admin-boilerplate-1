import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../Form';
import { formFieldName } from './signupForm';
import { handleSignupChange, handleSignupSubmit } from './action';
import { handleChangeInput, handleSubmitSignin } from './service';

let Signup = (props) => {
    let errorValue = { email: "", password: "", confPassword: "" };

    let formValue = props.signUpInfo;
    let handleChange = ({ currentTarget: input }) => {
        formValue = handleChangeInput(input, props);
    };

    const handleSubmit = (element) => {
        element.preventDefault();
        let signinSubmitArr = element.target;
        handleSubmitSignin(signinSubmitArr, props);
    }
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    }
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
                                            <button onClick={() => routChange("/")} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign In</button>
                                            <button onClick={() => routChange("/authe/signup")} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mx-2 justify-content-center font-weight-bold h3">Sign Up</div>
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
                                    <div className="row mx-2 justify-content-center font-weight-bold">
                                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
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
    signUpInfo: state.signup,
})

const mapDispatchToProps = dispatch => ({
    handleSignupChange: (value) => dispatch(handleSignupChange(value)),
    handleSignupSubmit: (value) => dispatch(handleSignupSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
