import React from 'react';
import { Route, Switch, useHistory,Redirect } from 'react-router-dom';
import {
    Signin,
    Signup,
    Users
} from '../Components/Contents';

function HomeRoute() {
    const history = useHistory();
    let isLogin = true;
    const githubPath= process.env.REACT_APP_GITHUB_PATH;
    return (
        <div className="container">
            <Switch>
                <Redirect from={`/${githubPath}`} to={`/${githubPath}/authe/signin`} exact />
                <Route path={`/${githubPath}/authe/signin`}  exact render={() => <Signin />}></Route>
                <Route path={`/${githubPath}/authe/signup`}  exact render={() => <Signup />}></Route>
                <Route path={`/${githubPath}/admin/users`}  exact render={() => <Users />}></Route>
                <Route render={() => <div>Not Found</div>}></Route>
            </Switch>
        </div>
    );
}

export default HomeRoute;
