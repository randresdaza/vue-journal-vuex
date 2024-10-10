import {shallowMount} from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Pruebas en el FAB component', () => {
    
    test('debe mostrar el icono por defecto', () => {
        
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i')

        expect(iTag.classes('fa-plus')).toBeTruthy()
    });

    test('debe mostrar el icono por argumento: fa-circle', () => {
        const wrapper = shallowMount(Fab,{
            props:{
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')

        expect(iTag.classes('fa-circle')).toBeTruthy()
    });

    test('debe emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount(Fab)

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)
    });
});