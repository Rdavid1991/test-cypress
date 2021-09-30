const fs = require("fs");
const { exec } = require("child_process");

(async (params) => {
  const columns = await new Promise((resolve, reject) => {
    exec(
      `sqlcmd -S localhost -U SA -P Abcd1234. -h-1 -Q "SELECT COLUMN_NAME FROM [PreCOLMENA].[INFORMATION_SCHEMA].[COLUMNS] WHERE TABLE_SCHEMA='dbo' AND TABLE_NAME='Offer' ORDER BY ORDINAL_POSITION;"`,
      (err, stdout, stderr) => {
        let COLUMNS;
        COLUMNS = stdout;
        COLUMNS = COLUMNS.replace(/\n/g, ",");
        COLUMNS = COLUMNS.replace(/\s/g, "");
        COLUMNS = COLUMNS.replace(/,,.*/g, "");
        COLUMNS = COLUMNS.replace(/(\w+)/g, "[$1]");
        COLUMNS = COLUMNS.replace(
          /^(.*)$/g,
          "INSERT INTO [dbo].[Offer]($1)VALUES()"
        );

        resolve(COLUMNS);
      }
    );
  });

  exec(
    ` sqlcmd -S localhost -U SA -P Abcd1234. -h-1 -Q"SELECT * FROM [PreCOLMENA].[dbo].[Offer]"`,
    (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
    }
  );
})();

//fs.readFile("/Users/joe/test.txt", "utf8", (err, data) => {
//  if (err) {
//    console.error(err);
//    return;
//  }
//  console.log(data);
//});
