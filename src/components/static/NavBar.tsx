import { Auth0Client, User } from "@auth0/auth0-spa-js";

function NavBar({ auth0, user }: { auth0?: Auth0Client; user?: User }) {
  return (
    <>
      <header className="navbar">
        <h1>Bookmarks</h1>
        {auth0 && user ? (
          <>
            <ul>
              <li>
                <img className="profilePic" src={user.picture} alt="" />
              </li>
              <li>
                <button onClick={() => auth0.logout()}>Log out</button>
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
