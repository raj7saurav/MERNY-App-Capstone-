const { User } = require("../model/User.model");
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../services/common");
const jwt = require("jsonwebtoken");

// signup
exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt: salt,
        });
        const doc = await user.save();
        // console.log(doc);

        // signup ke baad ek login session create nahi hota hai, iska ye matlab hua ki jab user signup karega to ya to passport usse login karne ko kahega kyuki passport kewal login functionality hi provide karta hain jisse signup ke baad session me data store nahi ho payega, isi functionality ko provide karane ke liye ye 'req.login()' use kiya ja raha hai...jisme req.login ke andar sanitizeUser(doc) me user ka data hai jo session create karega uss doc me kewal id aur role hi session me jakar store hoga kyuki sanitizeUser kewal id aur role hi session ko bhejega.
        req.login(sanitizeUser(doc), (err) => {
          // this also calls serializeer...
          if (err) {
            res.status(400).json(err.message);
          } else {
            const token = jwt.sign(
              sanitizeUser(doc),
              process.env.JWT_SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    ); // crypto.pbkdf2 ek Node.js module crypto ka method hai jo Password-Based Key Derivation Function 2 (PBKDF2) ka istemal karta hai. Iska upayog password se kriptografik key nikalne ke liye hota hai. PBKDF2 ek surakshit tarika hai jo password ke hash ko banane me ek computational cost jodta hai, jisse brute-force attacks ke khilaf adhik suraksha milti hai.
  } catch (err) {
    console.log("Error occured while creating new user : ", err.message);
    res.status(400).json(err.message);
  }
};

// login
exports.loginUser = async (req, res) => {
  const user = req.user;
  // console.log("login successfull");
  res
    .cookie("jwt", user.token, {
      // passport se authentication successfully complete ho jane ke baad client se header me cookie set kar di gayi hai jiske andar jwt jayega, aur har request per server use cookieExtractor se extract bhi kar lega...
      expires: new Date(Date.now() + 3600000), // 1 day
      httpOnly: true,
    })
    .status(200)
    .json({ id: user.id, role: user.role });

  // console.log("cookie sent to client.");
};

exports.checkAuth = async (req, res) => {
  // console.log("checking user..");

  if (req.user) {
    // console.log("req.user -> ", req.user);
    res.json(req.user);
  } else {
    // console.log("req.user is not available..");
    res.sendStatus(401);
  }
};


// logout controller
exports.logoutUser = async (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()), // cookie user ko null karke usi time expire bhi ho jayegi.
      httpOnly: true,
    })
    .sendStatus(200);

  // console.log("logout successfull");
};
