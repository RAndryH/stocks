import * as bcrypt from 'bcrypt'

export const encryptStr = async (str: string): Promise<string> => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10))
    const hash = await bcrypt.hash(str, salt)

    return hash
}