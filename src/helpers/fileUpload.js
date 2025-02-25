export const fileUpload = async(file) => {

    // if (!file) throw new Error('There is any file selected');

    if (!file) return null;

    const cloudURL = 'https://api.cloudinary.com/v1_1/dbshin2ov/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        //console.log(resp);
        if (!resp.ok) throw new Error('It was not possible to upload the file');

        const cloudResp = await resp.json();
        //console.log({ cloudResp });

        return cloudResp.secure_url;
        
    } catch (error) {

        // console.log(error);
        // throw new Error(error.message);

        return null;
    }

}