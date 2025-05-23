function Categoriegamefetch(cat) {
    const questions =  require("../../api/categoryquestions.js");
    const fetch = require('node-fetch'); 
    const cat = "science";
    getcategoryQuestions(cat);

};