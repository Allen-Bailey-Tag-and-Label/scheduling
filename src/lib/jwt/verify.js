// imports
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async token => await jwt.verify(token, process.env.JWT_SECRET)