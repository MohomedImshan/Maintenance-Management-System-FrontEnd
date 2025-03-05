function validation(values){
    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/
    

   
    const email = String(values.email||"").trim()
    const password = values.password||""
    


    if(!email){
        error.email = "Email shoud not be empty"

    }else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }

    if(!password){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match"
    }

    return error
}
export default validation