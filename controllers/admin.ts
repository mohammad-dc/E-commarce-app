import express, {Request, Response, NextFunction} from "express";
import session from "express-session";
import passport from "passport";
import local from "passport-local";
import connectionDB from "../config/db";

const localStragey = local.Strategy;

const app = express();

app.use(session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) =>{
    done(null, user);
});
passport.deserializeUser((id, done) =>{
    connectionDB.query(`SELECT ID, email, password FROM admin WHERE ID=${id}`, (error: Error | null, user: {ID: number, email: string, password: string} | null) =>{
        done(error, user);
    });
});

passport.use(new localStragey((email, password, done) =>{
    connectionDB.query(`SELECT ID, email, password FROM admin WHERE email=${email} AND password='${password}'`, (error: Error | null, user: {ID: number, email: string, password: string} | null) =>{
        if(error) return done(error);
        if(!user) return done(null, false, {message: 'الايميل او كلمة المرور خطأ'});
        return done(null, user);
    });
}));

const isLoggedIn = (req: Request, res: Response, next: NextFunction) =>{
    if(req.isAuthenticated()) return next();
    res.redirect('/admin/auth/login');
};

const isLoggedOut = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.isAuthenticated()) return next();
    res.redirect('/admin/dashboard');
};

const getAdminLogin = (req: Request, res: Response, next: NextFunction) =>{
    res.render('login', {title: 'Login', error: req.query.error});
};

const getAdminDashboard = (req: Request, res: Response, next: NextFunction) =>{
    res.render('dashboard', {title: 'Dashboard'});
};

const adminLogout = (req: Request, res: Response, next: NextFunction) =>{
    req.logout();
    res.redirect('/admin/auth/login');
};

const auth = () => passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
});

export default {isLoggedIn, isLoggedOut, getAdminLogin, getAdminDashboard, adminLogout, auth};