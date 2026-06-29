import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (userData) => {
	const payload = {
		id: userData.id, // Corregido: se usa ":" para asignar valores en un objeto, no "."
	}
	// Corregido: el método correcto es jwt.sign(), no jwt.sing()
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '35m' }) 
}
