//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    const results = await prisma.user.findMany({
        where: {
            name: {
                startsWith: query,
                mode: 'insensitive'
            }
        }
    })
    console.log('Search results:', results)
    return results as User[]
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber
        }
    })
    const validatedUser = userSchema.parse(newUser)
    revalidatePath('/')
    return validatedUser
}

export async function deleteUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        throw new Error(`User with id ${id} not found`)
    }
    await prisma.user.delete({ where: { id } })
    console.log(`User with id ${id} has been deleted.`)
    revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        throw new Error(`User with id ${id} not found`)
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.email && { email: data.email }),
            ...(data.phoneNumber && { phoneNumber: data.phoneNumber })
        }
    })
    const validatedUser = userSchema.parse(updatedUser)
    console.log(`User with id ${id} has been updated.`)
    revalidatePath('/')

    return validatedUser
}

export const getUserById = cache(async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user as User | null
})
