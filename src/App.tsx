import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fetch from "cross-fetch";
import Loading from "./components/static/Loading";
import AddLink from "./components/AddLink";
import EditLink from "./components/EditLink";
import Login from "./components/static/Login";

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (!isAuthenticated) return <Login />;

  const [links, setLinks] = useState([] as Link[]);
  const [pendingClick, setPendingClick] = useState(0);
  const [hover, setHover] = useState() as any;
  const [DisplayAddLink, setDisplayAddLink] = useState(false);
  const [DisplayEditLink, setDisplayEditLink] = useState(
    <div style={{ display: "none" }}></div>
  );

  async function checkLinks() {
    const accessToken = await getAccessTokenSilently();
    fetch(`https://${process.env.REACT_APP_URL_SERVER}/getLinks`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
      });
  }
  useEffect(() => {
    checkLinks();
    let interval = setInterval(() => {
      checkLinks();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  document.onclick = (e) => {
    if (DisplayAddLink || DisplayEditLink.type !== "div") {
      let element = e.target as HTMLDivElement;
      if (element.id === "outside") {
        if (element.classList.contains("addLink")) {
          return setDisplayAddLink(false);
        } else if (element.classList.contains("editLink")) {
          return setDisplayEditLink(<div style={{ display: "none" }}></div>);
        }
      } else return;
    }
    let element = e.target as HTMLDivElement;
    if (element.id === "addLink") return setDisplayAddLink(true);
    if (!element.id?.includes("http")) {
      if (element.parentElement?.id.includes("http")) {
        element = element.parentElement as HTMLDivElement;
      } else if (element.parentElement?.id === "addLink") {
        return setDisplayAddLink(true);
      }
    }
    if (pendingClick) {
      clearTimeout(pendingClick as any);
      setPendingClick(0);
    }
    switch (e.detail) {
      case 1:
        setPendingClick(
          setTimeout(function () {
            if (element.id.includes("http"))
              window.open(element.id.split(" - ")[0]);
          }, 500) as any
        );
        break;
      case 2:
        const link = links.find((li) => li.id === element.id.split(" - ")[1]);

        if (!link) return;
        setDisplayEditLink(
          <EditLink
            link={link}
            setDisplay={setDisplayEditLink}
            checkLinks={checkLinks}
          />
        );
        break;
    }
  };

  document.onmouseover = (e) => {
    let element = e.target as HTMLSpanElement;
    if (!element.id?.includes("http")) {
      if (element.parentElement?.id.includes("http")) {
        element = element.parentElement as HTMLSpanElement;
      } else return;
    }
    setHover(element);
    (element.querySelector(".msg") as HTMLSpanElement).style.opacity = "100%";
  };

  useEffect(() => {
    if (!hover) return;
    let interval = setInterval(() => {
      if (hover.matches(":hover")) return;
      (hover.querySelector(".msg") as HTMLSpanElement).style.opacity = "0%";
      return clearInterval(interval);
    }, 500) as any;
    setHover(null!);
  }, [hover]);

  return (
    <>
      <div className="links">
        <div className="link noRedirect" id="addLink">
          <img
            src="https://img.icons8.com/ios-glyphs/480/000000/plus.png"
            alt="+"
          />
          <span>Add Link</span>
        </div>
        {links.length ? (
          links.map((link) => (
            <div className="link" key={link.id} id={`${link.url} - ${link.id}`}>
              <img src={link.image} alt="" />
              <span className="linkName">
                {link.name.length > 16
                  ? link.name.slice(0, 16) + ".."
                  : link.name}
                <span className="msg" style={{ opacity: 0 }}>
                  Double Click to Edit/Delete
                </span>
              </span>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div style={{ display: DisplayAddLink ? "block" : "none" }}>
        <AddLink checkLinks={checkLinks} setDisplay={setDisplayAddLink} />
      </div>
      <div style={{ display: DisplayEditLink ? "block" : "none" }}>
        {DisplayEditLink}
      </div>
    </>
  );
}

export default App;
