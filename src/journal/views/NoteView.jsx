import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import { SaveOutlined, UploadOutlined, DeleteOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    });

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    
    }, [formState]);

    useEffect(() => {
      
        if (messageSaved.length > 0) {
            Swal.fire('Note updated', messageSaved, 'success');
        }

    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;
        
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }
    
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
                className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                /> 
                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined/>
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color='primary'
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Insert a title'
                    lable='Title'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}

                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='What happened today?'
                    lable='Title'
                    sx={{ border: 'none', mb: 1 }}
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutlined/>
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />
        </Grid>
    )
}
