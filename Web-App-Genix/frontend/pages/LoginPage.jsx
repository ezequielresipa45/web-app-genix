import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



function LoginPage() {

    // Estados para usuario y contraseña

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // MANEJO DEL ENVÍO DEL FORMULARIO

    const handleSubmit = async (e) => {


        e.preventDefault();


        // Datos que se enviarán al backend.

        const loginData = { username, password };

        // Llamar a la API

try {
    const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    });

    const data = await response.json();

       if(response.ok){

        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard')
       }else{
        setError(data.message)

       }
    
} catch (error) {

    console.error('Error:', error);
    setError('Hubo un problema al intentar iniciar sesión.');
    
    
}

    }







    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={username} placeholder='Usuario' onChange={(e) => { setUserName(e.target.value) }} required />
                <input type="password" placeholder='Ingrese la contraseña' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <button type='submit'>Ingresar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

        </div>

    )
}

export default LoginPage