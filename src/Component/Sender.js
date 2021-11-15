const os = window.require("os");
const tls = window.require("tls");

const globalConfig = {
  host: "smtp.qq.com",
  port: 465
};

/**
 * Class for sending emails on created
 * 
 * @param {object} info 
 * @param {object} config
 */
export default function Sender(info, config) {
  /**
   * interface info {
   *   current: Number = 0,
   *   counter: Number = 0,
   *   name: String = "DESKTOP-45M6KN1",
   *   host: String = "smtp.qq.com",
   *   port: Number = 587,
   *   sign: String = "Ichinoe"
   *   from: String = "2191558076@qq.com",
   *   auth: String = "fqxktlgdgbaddjcd",
   *   to: Object[] = [{ name: "Mizue", email: "shiinahiiragi@163.com" }],
   *   message: String
   * }
   */
  this.info = { ...info, ...config };
  this.info.current = 0;
  this.info.counter = 0;
  this.info.name = os.hostname();

  this.connect = function(check = false, callback) {
    this.quit = false;
    this.checkConnect = check;
    this.client = tls.connect(
      this.info.port,
      this.info.host,
      () => {
        this.client.on("data", (data) => {
          const codes = data.toString().split("\n").map((str) => str.match(/^\d+/));
          codes.length = codes.length - 1;
          const normal = codes.reduce((total, item) => total && /^(2|3)/.test(item), true);
          const next = this.__proto__.Action[this.info.current];

          console.log(`GET CODES: ${codes}`);
          console.log(`GET RESPONSE: ${data.toString()}`);
          if (normal && next) {
            next(this);
          } else if (!this.quit) {
            callback?.(normal ? undefined : data.toString());
            if (next) {
              this.quit = true;
              this.__proto__.Action[this.__proto__.Step.quit](this);
            }
          }
        });
      }
    );
  }

  /**
   * Write lines to the sockets
   * 
   * @param {String} lines
   * @param {Boolean} next
   * @param {Number} num
   */
  this.write = function(lines, next = true, num = 1) {
    if (next) {
      this.info.current += num;
      this.info.counter = 0;
    }
    console.log(`POST REQUEST: ${lines}`);
    this.client.write(`${lines}\r\n`);
  }
}

Sender.prototype.Step = {
  greet: 0,
  auth: 1,
  account: 2,
  password: 3,
  from: 4,
  to: 5,
  data: 6,
  content: 7,
  quit: 8
}

Sender.prototype.Action = {
  [Sender.prototype.Step.greet]: (sender) => {
    sender.write(`HELO ${sender.info.name}`);
  },
  [Sender.prototype.Step.auth]: (sender) => {
    sender.write(`AUTH LOGIN`);
  },
  [Sender.prototype.Step.account]: (sender) => {
    sender.write(Buffer.from(sender.info.from).toString('base64'));
  },
  [Sender.prototype.Step.password]: (sender) => {
    sender.write(
      Buffer.from(sender.info.auth).toString('base64'),
      true,
      sender.checkConnect ? sender.__proto__.Step.quit - sender.__proto__.Step.password : 1
    );
  },
  [Sender.prototype.Step.from]: (sender) => {
    sender.write(`MAIL FROM: <${sender.info.from}>`);
  },
  [Sender.prototype.Step.to]: (sender) => {
    sender.info.counter += 1;
    sender.write(
      `RCPT TO: <${sender.info.to[sender.info.counter - 1].email}>`,
      sender.info.counter === sender.info.to.length
    );
  },
  [Sender.prototype.Step.data]: (sender) => {
    sender.write(`DATA`);
  },
  [Sender.prototype.Step.content]: (sender) => {
    sender.info.message.content.replace(/\r\n/g, "\n");
    sender.write([
      `From: "${sender.info.sign}" <${sender.info.from}>`,
      ...(sender.info.to.map((item) => 
        `To: ${item.name.length ? `"${item.name}" ` : ` `}<${item.email}>`
      )),
      `Subject: ${sender.info.message.subject}`,
      `\r\n${sender.info.message.content}\r\n.`
    ].join("\r\n"));
  },
  [Sender.prototype.Step.quit]: (sender) => {
    sender.write(`QUIT`);
  }
};

export { globalConfig, Sender }

// const sender = new Sender({
//   to: [
//     {
//       name: "me",
//       email: "shiinahiiragi@163.com"
//     },
//     {
//       name: "stillMe",
//       email: "shiinahiiragi@outlook.com",
//     }
//   ],
//   message: {
//     subject: "TLS TEST",
//     content: "Test for tls.\r\n.\r\nA single dot here.\r\n"
//   }
// }, {
//   ...globalConfig,
//   sign: "Ichinoe",
//   from: "2191558076@qq.com",
//   auth: "fqxktlgdgbaddjcd"
// });

// sender.connect(true, (err) => {
//   if (err) {
//     console.log("ERR!");
//   } else {
//     console.log("SUCCESS!");
//   }
// });
