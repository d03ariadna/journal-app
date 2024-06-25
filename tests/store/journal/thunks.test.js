import { startNewNote } from "../../../src/store/journal";

describe('Pruebas en Journal Thunks', () => {
  
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe de crear una nueva nota en blanco', () => {
        
        const uid = 'TEST-ID';
        getState.mockReturnValue({ auth: { uid: uid } });
        
        startNewNote()(dispatch, getState);
    })

});
