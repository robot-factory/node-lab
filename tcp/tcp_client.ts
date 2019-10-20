import { connect } from "net";

const conn = connect(
  { port: 9000 },
  () => {
    conn.on("data", data => {
      console.log(data.toString());
    });
    conn.write("abcdefg");
    conn.end("hijklmn");
  }
);
