import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            image?: string | null
            role: "USER" | "STUDENT" | "LAWLITIGATORS" | "ADMIN"
            userRole?: UserRole | null
            bio?: string | null
            emailVerified?: Date | null
            roleExplicitlyChosen: boolean
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: string
        email: string
        name: string
        image?: string | null
        role: "USER" | "STUDENT" | "LAWLITIGATORS" | "ADMIN"
        userRole?: UserRole | null
        bio?: string | null,
        emailVerified?: Date | null
        roleExplicitlyChosen: boolean
        onboardingCompleted?: boolean | null
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        email: string
        name: string
        image?: string | null
        role: "USER" | "STUDENT" | "LAWLITIGATORS" | "ADMIN"
        userRole?: UserRole | null
        roleExplicitlyChosen: boolean
        bio?: string | null,
        emailVerified?: Date | null
        onboardingCompleted?: boolean | null
    }
}