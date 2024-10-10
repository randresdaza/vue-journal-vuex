import cloudinary from 'cloudinary';
import axios from 'axios';

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: 'drl3mxyh4' ,
    api_key: '426833997446671',
    api_secret: 'iWVJkCirL0zXq-H7O0zgZI_XgHI',
})


describe('Pruebas en el uploadImage', () => {

    test('debe cargar un archivo y retornar el url', async () => {
        const {data} = await axios.get('https://res.cloudinary.com/drl3mxyh4/image/upload/v1693083004/cld-sample.jpg',{
            responseType:'arraybuffer'
        })
        
        const file = new File([data],'foto.jpg')
        
        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg','')
        console.log(imageId);
        await cloudinary.v2.api.delete_resources(imageId)
    });
});