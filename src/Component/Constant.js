const localName = {
  email: "email",
  address: "address"
}

const sideList = {
  smtp: {
    index: 0,
    name: "SMTP Sender"
  },
  address: {
    index: 1,
    name: "Address"
  },
  new: {
    index: 2,
    name: "New Mail"
  },
  send: {
    index: 3,
    name: "Sended"
  },
  draft: {
    index: 4,
    name: "Saved Draft"
  }
}

const loadObject = (email, key) => {
  const pair = `${email}_${key}`;
  const storage = window.localStorage.getItem(pair);
  if (storage === null) {
    window.localStorage.setItem(pair, JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(storage);
  }
}

export default localName;
export { localName, sideList, loadObject }
