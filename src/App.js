import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  NavLink,
} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <h1>App Layout</h1>
        <NavLink to='/users'>Users List Page</NavLink>
        <Switch>
          <Route path='/users' component={UsersLayout} />
          <Route path='/' component={MainPage} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

function MainPage() {
  return <h1>Main Page</h1>
}

function UsersLayout() {
  const { path } = useRouteMatch()
  return (
    <div>
      <h1>User Layout</h1>
      <NavLink to='/'>Main Page</NavLink>
      <Switch>
        <Route path={path + '/:userId/profile'} component={UserProfilePage} />
        <Route path={path + '/:userId/edit'} component={EditUserPage} />
        <Route path={path} exact component={UsersListPage} />
        <Redirect from={path + '/:userId'} to={path + '/:userId/profile'} />
      </Switch>
    </div>
  )
}

function UserProfilePage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>UserPage</h1>
      <ul>
        <li>
          <NavLink to='/users'>Users List Page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit List Page</NavLink>
        </li>
        <p>userId:{userId}</p>
      </ul>
    </div>
  )
}

function EditUserPage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <NavLink to={'/users/' + userId}>User Profile Page</NavLink>
        </li>
        <li>
          <NavLink to={'/users/' + (+userId + 1)}>Another User</NavLink>
        </li>
        <li>
          <NavLink to='/users'>Users List Page</NavLink>
        </li>
      </ul>
    </div>
  )
}

function UsersListPage() {
  const { path } = useRouteMatch()
  return (
    <div>
      <h1>Users List Page</h1>
      <ul>
        {new Array(5).fill('').map((_, index) => (
          <li key={'users_list_component_' + index}>
            <NavLink to={`${path}/${index}`}>User {index}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
