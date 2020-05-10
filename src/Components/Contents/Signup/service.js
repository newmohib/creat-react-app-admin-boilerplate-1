

export let handleChangeInput = (input,props) => {
    let formValue = props.signUpInfo;
    let signUpInfo = { ...formValue, [input.name]: input.value };
    props.handleSignupChange(signUpInfo);
    return formValue

};

export let handleSubmitSignin = (signinSubmitArr,props) => {
    let signinObj = {};
    for (let i = 0; i < signinSubmitArr.length; i++) {
        const value = signinSubmitArr[i].value;
        const name = signinSubmitArr[i].name;
        if (name !== "") { signinObj[name] = value; }
    };
    props.handleSignupSubmit(signinObj);
}