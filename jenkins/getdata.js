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
                    "INSERT INTO [dbo].[Offer]($1)VALUES"
                );

                resolve(COLUMNS);
            }
        );
    });

    exec(
        "sqlcmd -S localhost -U SA -P Abcd1234. -h-1 -i selectOffer.sql -W -s \\|",
        (err, stdout, stderr) => {
            let CONTENT;
            CONTENT = stdout;
            CONTENT = CONTENT.replace(/\(.*\)$/gm, '');
            CONTENT = CONTENT.replace(/\n$.*/gm, '');
            CONTENT = CONTENT.replace(/\|/gm, `','`)
            CONTENT = CONTENT.replace(/^(.*)$/gm, '(\'$1\'),')
            CONTENT = CONTENT.replace(/,$/g, '')

            console.log(columns, CONTENT)
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
