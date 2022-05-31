// imports
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async v => await jwt.sign(v, process.env.JWT_SECRET)