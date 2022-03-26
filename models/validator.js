/**
 * validator.js
 */

"use strict"

const emailValidate = () => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}


module.exports = { emailValidate }