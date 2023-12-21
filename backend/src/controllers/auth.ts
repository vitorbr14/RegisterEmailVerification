
import  express, { Request, Response } from "express"

export const register = async (req: Request,res: Response)=>{
    res.json('Registerrr')
 }

export const login = async (req: Request,res: Response)=>{
   res.json('Login')
}

