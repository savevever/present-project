const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, User) {
    const authenticateUser = async (email, password, done) => {
        try {
            console.log('Authenticating user with email:', email);

            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                console.log('No user found with that email');
                return done(null, false, { message: 'No user with that email' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                console.log('Password matched');
                return done(null, user);
            } else {
                console.log('Password incorrect');
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {
        console.log('Serializing user:', user.id);
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            console.log('Deserializing user:', user.id);
            done(null, user);
        } catch (error) {
            console.error('Error during deserialization:', error);
            done(error);
        }
    });
}

module.exports = initialize;
