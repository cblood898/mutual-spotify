import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import Auth from './components/Auth';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import SetupStuff from './components/SetupStuff';
import ConsensualPlaylist from './components/ConsensualPlaylist';

const AdminAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.role === 'admin' },
  redirectAction: () => browserHistory.push("/"),
  wrapperDisplayName: 'UserIsAdmin'
})

const AdminRoutes = AdminAccess( (props) => props.children )

export default (
  <Route>
    <Route path="/" component={App}>
      <Route component={SetupStuff}>
        <IndexRoute component={Landing} />
        <Route path="signup" component={Auth} title="Sign Up" />
        <Route path="signin" component={Auth} title="Sign In" />
        <Route path="/success" component={browserHistory.goBack} />
        <Route path="/playlists/:id" component={ConsensualPlaylist} />
        <Route component={AuthenticatedRoutes}>

          {/* PROTECTED BY AUTHENTICATION */}
          <Route component={AdminRoutes}>
          {/* PROTECTED BY ADMIN ACCESS */}
          </Route>
        </Route>
        </Route>
        <Route path="*" status={404} component={NotFound}/>
    </Route>
  </Route>
)
