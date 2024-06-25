import { JournalLayout } from '../layout/JournalLayout';
import { AddOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { journalSlice } from '../../store/journal';

export const JournalPage = () => {

    const { isSaving, active } = useSelector(state => state.journal);
    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }
    return (

        <JournalLayout>

            {
                (!!active)
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton
                disabled={isSaving}
                onClick={onClickNewNote}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
        
    )
}
