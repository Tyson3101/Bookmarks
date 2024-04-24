import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <>
      <header className="navbar">
        <h1>Bookmarks</h1>
        {isAuthenticated && user ? (
          <>
            <ul>
              <li>
                <img className="profilePic" src={user.picture} alt="" />
              </li>
              <li>
                <button onClick={() => logout()}>Log out</button>
              </li>
            </ul>
          </>
        ) : (
          <></>
        )}
      </header>
    </>
  );
}

export default NavBar;
