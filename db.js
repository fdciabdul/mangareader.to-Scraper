const mysql = require("mysql2/promise");

// OOP Javascript Function by Abdul Muttaqin

const createConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "manga",
  });
};
var _escapeString = function (val) {
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
    switch (s) {
      case "\0":
        return "\\0";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\b":
        return "\\b";
      case "\t":
        return "\\t";
      case "\x1a":
        return "\\Z";
      case "'":
        return "''";
      case '"':
        return '""';
      default:
        return "\\" + s;
    }
  });

  return val;
};
const insertManga = async (manga_name,japan_title,description,chapter,genre,type,author,published,score,views,status,path_image) => {
  const connection = await createConnection();
  const insert = await connection.execute(
    `INSERT INTO info (id,manga_name,japan_title,description,chapter,genre,type,author,published,score,views,status,path_image) VALUES
       (NULL, '${manga_name}', '${japan_title}', '${_escapeString(
      description
    )}', '${chapter}', '${genre}', '${type}', '${author}', '${published}', '${score}', '${views}', '${status}', '${path_image}');`
  );
  return insert;
};

module.exports = {
  insertManga,
};
