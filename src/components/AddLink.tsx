import { User } from "@auth0/auth0-spa-js";
import fetch from "cross-fetch";
import React, { useRef } from "react";

function AddLink({
  user,
  checkLinks,
  setDisplay,
}: {
  user: User;
  checkLinks: Function;
  setDisplay: Function;
}) {
  const NameRef = useRef() as { current: HTMLInputElement };
  const WeppageURLRef = useRef() as { current: HTMLInputElement };
  const ImageRef = useRef() as { current: HTMLInputElement };

  function CheckImage(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => {
        reject(src);
      };
    });
  }

  async function add(e: any) {
    e.preventDefault();
    if (!NameRef.current.value.length) {
      return alert("Please input a name.");
    }
    let urlObject;
    try {
      urlObject = new URL(WeppageURLRef.current.value);
      if (!urlObject.origin || !urlObject.href || !urlObject.host) throw Error;
    } catch {
      return alert("Invaild URL");
    }
    let image: string;
    if (ImageRef.current.value.length > 2) {
      try {
        image = await CheckImage(ImageRef.current.value);
      } catch {
        return alert("Invaild Image. Leave blank for website favicon.");
      }
    } else {
      try {
        image = await CheckImage(urlObject.origin + "/favicon.ico");
      } catch {
        image = "https://i.imgur.com/O8FxG8i.png";
      }
    }
    const data: Link = {
      name: NameRef.current.value,
      url: urlObject.href,
      image: image!,
    };

    fetch(`https://${process.env.REACT_APP_URL_SERVER}/addLink`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${user.accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ user, link: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          checkLinks();
          setDisplay(false);
        } else alert("Unknown Error!");
      })
      .catch((e) => alert("Error! " + e.message));
  }

  return (
    <div className="LinkPromptContainer addLink" id="outside">
      <div className="LinkPrompt">
        <h1>Add Link</h1>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            ref={NameRef}
            autoComplete="off"
            type="text"
            placeholder="Name of bookmark"
            name="name"
            required
          />
          <label htmlFor="name">Weppage URL: </label>
          <input
            ref={WeppageURLRef}
            autoComplete="off"
            type="url"
            defaultValue="https://"
            name="url"
            required
          />
          <label htmlFor="name">Image: </label>
          <input
            ref={ImageRef}
            type="url"
            autoComplete="off"
            placeholder="Defaults to Website Favicon"
            name="url"
          />
          <button type="submit" onClick={add}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLink;
