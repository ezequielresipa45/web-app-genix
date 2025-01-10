import React, { useState } from 'react'

function LoginPage() {

    // Estados para usuario y contraseña

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    // MANEJO DEL ENVÍO DEL FORMULARIO

    const handleSubmit = (e) => {


        e.preventDefault();


        // Datos que se enviarán al backend.

        const loginData = { username, password };

        // Llamar a la API
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();

                } else { throw new Error('Credenciales incorrectas') };
            }).then((data) => {
                alert('¡Login Exitoso');
                console.log(data)
            })
            .catch((error) => {
                alert(error.message)
            })


    }







    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={username} placeholder='Usuario' onChange={(e) => { setUserName(e.target.value) }} required />
                <input type="password" placeholder='Ingrese la contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <button type='submit'>Ingresar</button>
            </form>

        </div>

    )
}

export default LoginPage