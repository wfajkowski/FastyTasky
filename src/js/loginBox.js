const loginButton = document.querySelector('.login_button')
const registerButton = document.querySelector('.register_button')

//Wyswietla formularz logowania po kliknięciu Sign In
loginButton.addEventListener('click', () => {
    const loginBox = document.querySelector('.login_box')
    loginBox.style.display = 'none'
    loginBox.nextElementSibling.style.display = 'flex'

    //akcja po ponownym kliknięciu przycisku Sign In
    const signIn = document.querySelector('.login_clicked_box button')

    signIn.addEventListener('click', () => {
        const email = document.querySelectorAll('.login_clicked_box input')[0].value //pobranie emaila z input
        const password = document.querySelectorAll('.login_clicked_box input')[1].value // pobranie hasla z input

        //testowe wyswietlenie pobranych inputow, po kliknięciu przycisku
        console.log(email, password)
    })
})

//Wyswietla formularz rejestracji po kliknięciu Register
registerButton.addEventListener('click', () => {
    const loginBox = document.querySelector('.login_box')
    loginBox.style.display = 'none'
    loginBox.nextElementSibling.nextElementSibling.style.display = 'flex'

    //akcja po ponownym kliknięciu przycisku register
    const register = document.querySelector('.register_clicked_box button')

    register.addEventListener('click', () => {
        const login = document.querySelectorAll('.register_clicked_box input')[0].value //pobranie loginu z input
        const email = document.querySelectorAll('.register_clicked_box input')[1].value // pobranie emaila z input
        const password = document.querySelectorAll('.register_clicked_box input')[2].value // pobranie hasla z input

        //testowe wyswietlenie pobranych inputów
        console.log(login, email, password)
    })
})