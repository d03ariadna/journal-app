import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dbshin2ov',
    api_key: '654288437462145',
    api_secret: 'CVnRJFmDqSH0t71DWv6WDutIWi4',
    secure: true
});

class MockFile extends Blob {
    constructor(chunks, filename, options) {
        super(chunks, options);
        this.name = filename;
        this.lastModified = options && options.lastModified || Date.now();
    }
}
describe('Pruebas en fileUpload', () => {

    test('Debe subir el archivo correctamente', async() => {

        const imageURL = 'https://images.unsplash.com/photo-1718603630685-d2605d5190e8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new MockFile([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        const cloudinaryResp = await cloudinary.api.delete_resources([imageId], {
            rescource_type: 'image'
        });


    });

    test('Debe de retornal null', async() => {
       
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);

    });

});