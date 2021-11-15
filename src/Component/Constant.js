const localName = {
  email: "email",
  address: "address",
  sign: "sign",
  sended: "sended",
  draft: "draft"
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

const contacts = [
  {
    field: "id",
    headerName: "ID",
    width: "160"
  },
  {
    field: "name",
    headerName: "Name",
    width: "200"
  },
  {
    field: "email",
    headerName: "E-Mail",
    width: "300"
  },
];

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

const saveObject = (email, key, obj) => {
  const pair = `${email}_${key}`;
  window.localStorage.setItem(pair, JSON.stringify(obj));
}

const timeFormat = (transDate, formatString) => {
  if (typeof transDate === "string")
    transDate = new Date(transDate);
  var formatComponent = {
    "M+": transDate.getMonth() + 1,
    "d+": transDate.getDate(),
    "h+": transDate.getHours(),
    "m+": transDate.getMinutes(),
    "s+": transDate.getSeconds(),
    "q+": Math.floor((transDate.getMonth() + 3) / 3),
    S: transDate.getMilliseconds()
  };

  if (/(y+)/.test(formatString))
    formatString = formatString.replace(
      RegExp.$1,
      (transDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  for (var index in formatComponent)
    if (new RegExp(`(${index})`).test(formatString))
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? formatComponent[index]
          : ("00" + formatComponent[index]).substr(
              ("" + formatComponent[index]).length
            )
      );
  return formatString;
};

const emailReg = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default localName;
export { localName, sideList, contacts, loadObject, saveObject, timeFormat, emailReg }
