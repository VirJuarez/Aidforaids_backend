import passport from 'passport';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request , Response} from 'express';

const prisma = new PrismaClient();

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user); //aca era user.id??
});

passport.deserializeUser(async (id: number, done) => {
    const user = await prisma.user.findUnique({ where: { id } });

    done(null, user);
});

export const isAuthenticated = (req: Request, res: Response, next:any) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({ message: 'Unauthorized' });
};
