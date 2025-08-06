import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import {  v4 as uuidv4 } from 'uuid'
import { pickUser } from '~/utils/formatters'
const createNew = async (reqBody)=>{
    try {
        //kiểm tra xem email đã tồn tại hay chưa
        const existingUser = await userModel.findOneByEmail(reqBody.email)
        if(existingUser) {
            throw new ApiError(StatusCodes.CONFLICT, 'Email already exists');
        }
        //tạo data để save vào db
        const nameFromEmail = reqBody.email.split('@')[0]
        //gửi email cho user xác thực account 
        
              const newUser = {
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 8), //hash password
            userName: nameFromEmail,
            displayName: nameFromEmail,
            verifyToken:  uuidv4()
        }

        const createdUser = await userModel.createNew(newUser)
        const getNewUser = await userModel.findOneByEmail(createdUser.insertedId)

        return pickUser(getNewUser);
    } catch (error) {
        throw error;

    }
}

export const userService = {
    createNew
}