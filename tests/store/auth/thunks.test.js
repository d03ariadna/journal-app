import { checkigAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal";

jest.mock("../../../src/firebase/providers");


describe('Pruebas en AuthThunks', () => {

    
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    
    test('Debe de invocar checkingCredentials', async () => {

        await checkigAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {
        
        const loginData = { ok: true, ...demoUser }
        
        await singInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( login(loginData));
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
        
        const loginData = { ok: false, errorMessage: 'An error ocurred'}
        
        await singInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage));
    });

    // test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login', async () => {
        
    //     const loginData = { ok: true, ...demoUser }
    //     const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };
        
    //     const { ok, uid, photoURL, displayName, email, errorMessage } = await registerUserWithEmailPassword.mockResolvedValue(loginData);

    //     //thunk
    //     await startCreatingUserWithEmailPassword(formData)(dispatch);

    //     expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    //     expect(dispatch).toHaveBeenCalledWith( login({ uid, displayName, email, photoURL }));
    // });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {
        
        const loginData = { ok: true, ...demoUser }
        
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);

        //thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( login(loginData));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {
        
        const loginData = { ok: true, ...demoUser }
        
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);

        //thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( login(loginData));
    });

    test('startLogout debe de llamar logouFirebase, clearNotes y logout', async () => {
        
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });

});
