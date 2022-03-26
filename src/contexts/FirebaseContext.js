import PropTypes from 'prop-types';
import {createContext, useEffect, useReducer, useState} from 'react';
import firebase from 'firebase';
//
import {FIREBASE_API} from '../config';

// ----------------------------------------------------------------------

// import {
//     getAuth,
//     signOut,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
// } from 'firebase/auth';
// import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';


const ADMIN_EMAILS = ['vnkhoi76@gmail.com'];

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_API);
} else {
    firebase.app(); // if already initialized, use that one
}

const AUTH = firebase.auth();

const DB = firebase.firestore();

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const reducer = (state, action) => {
    if (action.type === 'INITIALISE') {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    }

    return state;
};

const AuthContext = createContext({
    ...initialState,
    method: 'firebase',
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [profile, setProfile] = useState(null);

    useEffect(
        () =>
            AUTH.onAuthStateChanged(async (user) => {
                if (user) {
                    const userRef = DB.doc('users', user.uid);

                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                    }

                    dispatch({
                        type: 'INITIALISE',
                        payload: {isAuthenticated: true, user},
                    });
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {isAuthenticated: false, user: null},
                    });
                }
            }),
        [dispatch]
    );

    const login = (email, password) => signInWithEmailAndPassword(AUTH, email, password);

    const register = (email, password, firstName, lastName) =>
        createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
            const userRef = doc(collection(DB, 'users'), res.user?.uid);

            await setDoc(userRef, {
                uid: res.user?.uid,
                email,
                displayName: `${firstName} ${lastName}`,
            });
        });

    const logout = () => signOut(AUTH);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'firebase',
                user: {
                    id: state?.user?.uid,
                    email: state?.user?.email,
                    photoURL: state?.user?.photoURL || profile?.photoURL,
                    displayName: state?.user?.displayName || profile?.displayName,
                    role: ADMIN_EMAILS.includes(state?.user?.email) ? 'admin' : 'user',
                    phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
                    country: profile?.country || '',
                    address: profile?.address || '',
                    state: profile?.state || '',
                    city: profile?.city || '',
                    zipCode: profile?.zipCode || '',
                    about: profile?.about || '',
                    isPublic: profile?.isPublic || false,
                },
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = DB.collection(collection);
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents data
                setDocuments([]);
                return;
            }

            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            );
        }

        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, [collection, condition]);

    return documents;
};

export {AuthContext, AuthProvider, DB, useFirestore};
